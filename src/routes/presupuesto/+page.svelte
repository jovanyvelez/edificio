<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { datos: jsonData }: { datos: { item_nombre: string; mes: number; valor: number }[] } =
		data;

	// Estructura de datos para la tabla
	let items: string[] = $state([]);
	type TableData = {
		[key: string]: {
			[month: number]: number;
		};
	};

	let tableData: TableData = $state({});

	// Meses del año
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	processData();

	function processData() {
		// Extraer items únicos
		items = [...new Set(jsonData.map((d: { item_nombre: string }) => d.item_nombre))];

		// Inicializar tabla
		tableData = {};
		items.forEach((item) => {
			tableData[item] = {};
			for (let i = 1; i <= 12; i++) {
				tableData[item][i] = 0;
			}
		});

		// Llenar datos
		jsonData.forEach((d) => {
			tableData[d.item_nombre][d.mes] = d.valor;
		});
	}

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(value);
	}
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th class="corner-header">Items</th>
				{#each meses as mes}
					<th>{mes}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each items as item}
				<tr>
					<td class="item-column">{item}</td>
					{#each Array.from({ length: 12 }, (_, i) => i + 1) as mes}
						<td>{formatCurrency(tableData[item][mes])}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	@reference "tailwindcss";
	.table-container {
		@apply w-full overflow-auto;
		max-height: 80vh;
	}

	table {
		@apply w-full border-collapse bg-white;
	}

	th,
	td {
		@apply border border-gray-300 p-2 text-sm;
	}

	th {
		@apply bg-gray-100 font-semibold;
	}

	/* Estilos para fijar la primera columna y fila */
	.table-container {
		@apply relative;
	}

	.corner-header {
		@apply sticky top-0 left-0 z-30 bg-gray-200;
	}

	thead th {
		@apply sticky top-0 z-20 bg-gray-100;
	}

	.item-column {
		@apply sticky left-0 z-10 bg-white;
		min-width: 200px;
	}

	/* Estilos responsivos */
	@media (max-width: 768px) {
		.table-container {
			@apply rounded-lg shadow-md;
		}

		th,
		td {
			@apply p-1 text-xs;
		}

		.item-column {
			min-width: 150px;
		}
	}
</style>
