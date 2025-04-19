<script lang="ts">

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { budgetData } = data;


	// Estado para controlar el ordenamiento
	let sortField: keyof (typeof budgetData)[0] = $state('id');
	let sortDirection = $state('asc');



	// Formatear números como dinero en COP
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(value);
	}

	// Formatear porcentaje
	function formatPercentage(value: number) {
		return `${value.toFixed(2)}%`;
	}

	// Función para ordenar los datos
	function sortData(field: string) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field as keyof (typeof budgetData)[0];
			sortDirection = 'asc';
		}

		budgetData.sort((a, b) => {
			const aValue = a[sortField];
			const bValue = b[sortField];

			const comparison =
				typeof aValue === 'string'
					? aValue.localeCompare(bValue as string)
					: (aValue as number) - (bValue as number);

			return sortDirection === 'asc' ? comparison : -comparison;
		});
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-center text-2xl font-bold">Control de Presupuesto</h1>

	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-100 text-gray-700">
					<th class="td1 cursor-pointer" onclick={() => sortData('item')}>
						<div class="th2">Concepto</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('presupuestoAcumulado')}>
						<div class="th1">Presupuesto</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('gastoAcumulado')}>
						<div class="th1">Gasto</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('diferencia')}>
						<div class="th1">Diferencia</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('porcentaje')}>
						<div class="th1">% Ejecutado</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each budgetData as row (row.id)}
					<tr class="border-b hover:bg-gray-50">
						<td class="t1" data-label="Concepto">
							<span class="noshow">Concepto:</span>
							<span>{row.item}</span>
						</td>
						<td class="td2 px-4" data-label="Presupuesto">
							<span class="noshow">Presupuesto:</span>
							<span>{formatCurrency(row.presupuestoAcumulado)}</span>
						</td>
						<td class="td2" data-label="Gasto">
							<span class="noshow">Gasto:</span>
							<span>{formatCurrency(row.gastoAcumulado)}</span>
						</td>
						<td
							class="td2"
							class:text-red-600={row.diferencia < 0}
							class:text-green-600={row.diferencia > 0}
							data-label="Diferencia"
						>
							<span class="noshow">Diferencia:</span>
							<span>{formatCurrency(row.diferencia)}</span>
						</td>
						<td class="td2" data-label="% Ejecutado">
							<span class="noshow">% Ejecutado:</span>
							<div class="th3">
								<div class="w-16">{formatPercentage(row.porcentaje)}</div>
								<div class="ml-2 h-2.5 w-full max-w-24 rounded-full bg-gray-200">
									<div
										class="h-2.5 rounded-full"
										class:bg-green-600={row.porcentaje <= 85}
										class:bg-yellow-500={row.porcentaje > 85 && row.porcentaje <= 100}
										class:bg-red-600={row.porcentaje > 100}
										style="width: {Math.min(row.porcentaje, 100)}%"
									></div>
								</div>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="bg-gray-50 font-semibold">
					<td class="px-4 py-3 text-left" data-label="Total">Total</td>
					<td class="px-4 py-3 text-right" data-label="Total Presupuesto">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.presupuestoAcumulado, 0))}
					</td>
					<td class="px-4 py-3 text-right" data-label="Total Gasto">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.gastoAcumulado, 0))}
					</td>
					<td class="px-4 py-3 text-right" data-label="Total Diferencia">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.diferencia, 0))}
					</td>
					<td class="px-4 py-3 text-right" data-label="Total % Ejecutado">
						{formatPercentage(
							(budgetData.reduce((sum, row) => sum + row.gastoAcumulado, 0) /
								budgetData.reduce((sum, row) => sum + row.presupuestoAcumulado, 0)) *
								100
						)}
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<style>
	@reference "tailwindcss";

	:global(body) {
		@apply bg-gray-100 text-gray-800;
	}

	table {
		@apply w-full border-collapse;
	}

	th {
		@apply font-medium;
	}

	tr {
		@apply transition duration-150;
	}

	.noshow {
		@apply font-semibold md:hidden;
	}

	.td1 {
		@apply px-4 py-3 text-left font-bold;
	}
	.td2 {
		@apply px-4 py-3 text-right;
	}

	/* Estilos responsive */
	@media (max-width: 768px) {
		table {
			@apply block;
		}

		thead,
		tbody,
		tr {
			@apply block;
		}

		thead tr {
			@apply hidden;
		}

		tbody tr {
			@apply mb-4 rounded-lg border border-gray-200 bg-white shadow;
		}

		td {
			@apply flex flex-wrap items-center justify-between border-b px-4 py-3 last:border-b-0;
		}

		tfoot {
			@apply mt-6 block;
		}

		tfoot tr {
			@apply grid grid-cols-1 gap-2 rounded-lg border border-gray-300 bg-gray-100 p-4;
		}

		tfoot td {
			@apply flex justify-between py-2;
		}

		tfoot td:before {
			@apply font-bold;
			content: attr(data-label);
		}
	}
</style>
