<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { paymentsData } = data;

	// Estado para controlar el ordenamiento
	let sortField: keyof (typeof paymentsData)[0] = $state('apartamento');
	let sortDirection = $state('asc');

	// Formatear números como dinero en COP
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(value);
	}

	// Función para ordenar los datos
	function sortData(field: string) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field as keyof (typeof paymentsData)[0];
			sortDirection = 'asc';
		}

		paymentsData.sort((a, b) => {
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

<div class="main_div container mx-auto px-4 py-8">
	<h1 class="mb-6 text-center text-2xl font-bold">Pagos por Apartamento</h1>

	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-100 text-gray-700">
					<th class="td1 cursor-pointer" onclick={() => sortData('apartamento')}>
						<div class="th2">Apartamento</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('total')}>
						<div class="th1">Total</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('abono_cuotas')}>
						<div class="th1">Abono</div>
					</th>
					<th class="td2 cursor-pointer" onclick={() => sortData('interes')}>
						<div class="th1">Interés</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each paymentsData as row (row.apartamento)}
					<tr
						class="border-b hover:bg-gray-50"
						class:bg-red-100={row.abono_cuotas === 0}
						class:row-zero-payment={row.abono_cuotas === 0}
					>
						<td class="t1" data-label="Apartamento">
							<span class="noshow">Apartamento:</span>
							<span>{row.apartamento}</span>
						</td>
						<td class="td2 px-4" data-label="Total">
							<span class="noshow">Total:</span>
							<span>{formatCurrency(row.total)}</span>
						</td>
						<td class="td2" data-label="Abono">
							<span class="noshow">Abono:</span>
							<span>{formatCurrency(row.abono_cuotas)}</span>
						</td>
						<td class="td2" data-label="Interés">
							<span class="noshow">Interés:</span>
							<span>{formatCurrency(row.interes)}</span>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="bg-gray-50 font-semibold">
					<td class="px-4 py-3 text-left" data-label="Total">Total</td>
					<td class="px-4 py-3 text-right" data-label="Total Pagos">
						{formatCurrency(paymentsData.reduce((sum, row) => sum + row.total, 0))}
					</td>
					<td class="px-4 py-3 text-right" data-label="Total Abonos">
						{formatCurrency(paymentsData.reduce((sum, row) => sum + row.abono_cuotas, 0))}
					</td>
					<td class="px-4 py-3 text-right" data-label="Total Interés">
						{formatCurrency(paymentsData.reduce((sum, row) => sum + row.interes, 0))}
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

	.th1 {
		@apply flex items-center justify-end;
	}

	.th2 {
		@apply flex items-center justify-start;
	}

	.t1 {
		@apply px-4 py-3 text-left;
	}
	.main_div {
		@apply  px-44;

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

		/* Aplicamos el color de fondo rosa a las filas con abono cero en vista móvil */
		tbody tr.row-zero-payment {
			@apply bg-red-100;
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
		.main_div {
		@apply  px-1;

	}
	}
</style>
