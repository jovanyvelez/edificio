<!--script lang="ts">
	// Los datos del presupuesto
	const budgetData = $state([
		{
			id: 11,
			item: 'Administración',
			presupuestoAcumulado: 615000,
			gastoAcumulado: 300000,
			diferencia: 315000,
			porcentaje: 48.78048780487805
		},
		{
			id: 1,
			item: 'Aseo zonas comunes y botada de basuras',
			presupuestoAcumulado: 1843000,
			gastoAcumulado: 900000,
			diferencia: 943000,
			porcentaje: 48.83342376559956
		},
		{
			id: 12,
			item: 'Bolsas de basura Jumbo',
			presupuestoAcumulado: 85000,
			gastoAcumulado: 0,
			diferencia: 85000,
			porcentaje: 0
		},
		{
			id: 16,
			item: 'Compra papeleria',
			presupuestoAcumulado: 18000,
			gastoAcumulado: 0,
			diferencia: 18000,
			porcentaje: 0
		},
		{
			id: 2,
			item: 'Construcción nuevo tanque de agua',
			presupuestoAcumulado: 3700000,
			gastoAcumulado: 2413195,
			diferencia: 1286805,
			porcentaje: 65.2214864864865
		},
		{
			id: 4,
			item: 'Cuidado jardines del edificio',
			presupuestoAcumulado: 240000,
			gastoAcumulado: 0,
			diferencia: 240000,
			porcentaje: 0
		},
		{
			id: 7,
			item: 'Equipo de jardineria',
			presupuestoAcumulado: 250000,
			gastoAcumulado: 0,
			diferencia: 250000,
			porcentaje: 0
		},
		{
			id: 24,
			item: 'Fondo de imprevistos',
			presupuestoAcumulado: 1019240,
			gastoAcumulado: 0,
			diferencia: 1019240,
			porcentaje: 0
		},
		{
			id: 15,
			item: 'Implementos de aseo',
			presupuestoAcumulado: 66000,
			gastoAcumulado: 18040,
			diferencia: 47960,
			porcentaje: 27.333333333333332
		},
		{
			id: 13,
			item: 'Impresión documentos',
			presupuestoAcumulado: 22000,
			gastoAcumulado: 0,
			diferencia: 22000,
			porcentaje: 0
		},
		{
			id: 6,
			item: 'Insumos para el jardin',
			presupuestoAcumulado: 151000,
			gastoAcumulado: 0,
			diferencia: 151000,
			porcentaje: 0
		},
		{
			id: 17,
			item: 'Mantenimiento Techo',
			presupuestoAcumulado: 400000,
			gastoAcumulado: 0,
			diferencia: 400000,
			porcentaje: 0
		},
		{
			id: 8,
			item: 'Mantenimiento citófono',
			presupuestoAcumulado: 350400,
			gastoAcumulado: 0,
			diferencia: 350400,
			porcentaje: 0
		},
		{
			id: 14,
			item: 'Mantenimiento de puertas',
			presupuestoAcumulado: 100000,
			gastoAcumulado: 0,
			diferencia: 100000,
			porcentaje: 0
		},
		{
			id: 18,
			item: 'Mantenimiento equipo de presión de agua',
			presupuestoAcumulado: 500000,
			gastoAcumulado: 1276622,
			diferencia: -776622,
			porcentaje: 255.3244
		},
		{
			id: 21,
			item: 'Mantenimiento malla plástica',
			presupuestoAcumulado: 180000,
			gastoAcumulado: 0,
			diferencia: 180000,
			porcentaje: 0
		},
		{
			id: 5,
			item: 'Pago servicios de poda',
			presupuestoAcumulado: 312000,
			gastoAcumulado: 312000,
			diferencia: 0,
			porcentaje: 100
		},
		{
			id: 3,
			item: 'Pago servicios públicos',
			presupuestoAcumulado: 660000,
			gastoAcumulado: 150857,
			diferencia: 509143,
			porcentaje: 22.85712121212121
		},
		{
			id: 23,
			item: 'Recarga de Extintores',
			presupuestoAcumulado: 300000,
			gastoAcumulado: 0,
			diferencia: 300000,
			porcentaje: 0
		},
		{
			id: 20,
			item: 'Reparación fachada',
			presupuestoAcumulado: 200000,
			gastoAcumulado: 200000,
			diferencia: 0,
			porcentaje: 100
		},
		{
			id: 22,
			item: 'Servicios Contables',
			presupuestoAcumulado: 200000,
			gastoAcumulado: 0,
			diferencia: 200000,
			porcentaje: 0
		}
	]);

	// Estado para controlar el ordenamiento
	let sortField: keyof (typeof budgetData)[0] = $state('id');
	let sortDirection = $state('asc');

	// Estado para controlar la búsqueda
	let searchQuery = $state('');

	// Estado para la paginación
	let currentPage = $state(1);
	let itemsPerPage = 10;

	// Formatear números como dinero en COP
	function formatCurrency(value) {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(value);
	}

	// Formatear porcentaje
	function formatPercentage(value) {
		return `${value.toFixed(2)}%`;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-center text-2xl font-bold">Control de Presupuesto</h1>

	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-100 text-gray-700">
					<th class="cursor-pointer px-4 py-3 text-left">
						<div class="flex items-center">Concepto</div>
					</th>
					<th class="cursor-pointer px-4 py-3 text-right">
						<div class="flex items-center justify-end">Presupuesto</div>
					</th>
					<th class="cursor-pointer px-4 py-3 text-right">
						<div class="flex items-center justify-end">Gasto</div>
					</th>
					<th class="cursor-pointer px-4 py-3 text-right">
						<div class="flex items-center justify-end">Diferencia</div>
					</th>
					<th class="cursor-pointer px-4 py-3 text-right">
						<div class="flex items-center justify-end">% Ejecutado</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each budgetData as row (row.id)}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-4 py-3 text-left">{row.item}</td>
						<td class="px-4 py-3 text-right">{formatCurrency(row.presupuestoAcumulado)}</td>
						<td class="px-4 py-3 text-right">{formatCurrency(row.gastoAcumulado)}</td>
						<td
							class="px-4 py-3 text-right"
							class:text-red-600={row.diferencia < 0}
							class:text-green-600={row.diferencia > 0}
						>
							{formatCurrency(row.diferencia)}
						</td>
						<td class="px-4 py-3 text-right">
							<div class="flex items-center justify-end">
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
					<td class="px-4 py-3 text-left">Total</td>
					<td class="px-4 py-3 text-right">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.presupuestoAcumulado, 0))}
					</td>
					<td class="px-4 py-3 text-right">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.gastoAcumulado, 0))}
					</td>
					<td class="px-4 py-3 text-right">
						{formatCurrency(budgetData.reduce((sum, row) => sum + row.diferencia, 0))}
					</td>
					<td class="px-4 py-3 text-right">
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
		@apply bg-gray-50 text-gray-800;
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

	/* Estilos responsive */
	@media (max-width: 768px) {
		table {
			@apply block;
		}

		thead,
		tbody,
		tfoot,
		tr,
		th,
		td {
			@apply block;
		}

		thead tr {
			@apply hidden;
		}

		tbody tr {
			@apply mb-4 rounded-lg shadow;
		}

		td {
			@apply flex items-center justify-between border-b px-3 py-2;
		}

		td:before {
			@apply mr-2 font-medium;
			content: attr(data-label);
		}

		tfoot tr {
			@apply mt-4 border-t pt-2;
		}
	}
</style-->

<script lang="ts">
	// Los datos del presupuesto
	const budgetData = $state([
		{
			id: 11,
			item: 'Administración',
			presupuestoAcumulado: 615000,
			gastoAcumulado: 300000,
			diferencia: 315000,
			porcentaje: 48.78048780487805
		},
		{
			id: 1,
			item: 'Aseo zonas comunes y botada de basuras',
			presupuestoAcumulado: 1843000,
			gastoAcumulado: 900000,
			diferencia: 943000,
			porcentaje: 48.83342376559956
		},
		{
			id: 12,
			item: 'Bolsas de basura Jumbo',
			presupuestoAcumulado: 85000,
			gastoAcumulado: 0,
			diferencia: 85000,
			porcentaje: 0
		},
		{
			id: 16,
			item: 'Compra papeleria',
			presupuestoAcumulado: 18000,
			gastoAcumulado: 0,
			diferencia: 18000,
			porcentaje: 0
		},
		{
			id: 2,
			item: 'Construcción nuevo tanque de agua',
			presupuestoAcumulado: 3700000,
			gastoAcumulado: 2413195,
			diferencia: 1286805,
			porcentaje: 65.2214864864865
		},
		{
			id: 4,
			item: 'Cuidado jardines del edificio',
			presupuestoAcumulado: 240000,
			gastoAcumulado: 0,
			diferencia: 240000,
			porcentaje: 0
		},
		{
			id: 7,
			item: 'Equipo de jardineria',
			presupuestoAcumulado: 250000,
			gastoAcumulado: 0,
			diferencia: 250000,
			porcentaje: 0
		},
		{
			id: 24,
			item: 'Fondo de imprevistos',
			presupuestoAcumulado: 1019240,
			gastoAcumulado: 0,
			diferencia: 1019240,
			porcentaje: 0
		},
		{
			id: 15,
			item: 'Implementos de aseo',
			presupuestoAcumulado: 66000,
			gastoAcumulado: 18040,
			diferencia: 47960,
			porcentaje: 27.333333333333332
		},
		{
			id: 13,
			item: 'Impresión documentos',
			presupuestoAcumulado: 22000,
			gastoAcumulado: 0,
			diferencia: 22000,
			porcentaje: 0
		},
		{
			id: 6,
			item: 'Insumos para el jardin',
			presupuestoAcumulado: 151000,
			gastoAcumulado: 0,
			diferencia: 151000,
			porcentaje: 0
		},
		{
			id: 17,
			item: 'Mantenimiento Techo',
			presupuestoAcumulado: 400000,
			gastoAcumulado: 0,
			diferencia: 400000,
			porcentaje: 0
		},
		{
			id: 8,
			item: 'Mantenimiento citófono',
			presupuestoAcumulado: 350400,
			gastoAcumulado: 0,
			diferencia: 350400,
			porcentaje: 0
		},
		{
			id: 14,
			item: 'Mantenimiento de puertas',
			presupuestoAcumulado: 100000,
			gastoAcumulado: 0,
			diferencia: 100000,
			porcentaje: 0
		},
		{
			id: 18,
			item: 'Mantenimiento equipo de presión de agua',
			presupuestoAcumulado: 500000,
			gastoAcumulado: 1276622,
			diferencia: -776622,
			porcentaje: 255.3244
		},
		{
			id: 21,
			item: 'Mantenimiento malla plástica',
			presupuestoAcumulado: 180000,
			gastoAcumulado: 0,
			diferencia: 180000,
			porcentaje: 0
		},
		{
			id: 5,
			item: 'Pago servicios de poda',
			presupuestoAcumulado: 312000,
			gastoAcumulado: 312000,
			diferencia: 0,
			porcentaje: 100
		},
		{
			id: 3,
			item: 'Pago servicios públicos',
			presupuestoAcumulado: 660000,
			gastoAcumulado: 150857,
			diferencia: 509143,
			porcentaje: 22.85712121212121
		},
		{
			id: 23,
			item: 'Recarga de Extintores',
			presupuestoAcumulado: 300000,
			gastoAcumulado: 0,
			diferencia: 300000,
			porcentaje: 0
		},
		{
			id: 20,
			item: 'Reparación fachada',
			presupuestoAcumulado: 200000,
			gastoAcumulado: 200000,
			diferencia: 0,
			porcentaje: 100
		},
		{
			id: 22,
			item: 'Servicios Contables',
			presupuestoAcumulado: 200000,
			gastoAcumulado: 0,
			diferencia: 200000,
			porcentaje: 0
		}
	]);

	// Estado para controlar el ordenamiento
	let sortField: keyof (typeof budgetData)[0] = $state('id');
	let sortDirection = $state('asc');

	// Estado para controlar la búsqueda
	let searchQuery = $state('');

	// Estado para la paginación
	let currentPage = $state(1);
	let itemsPerPage = 10;

	// Formatear números como dinero en COP
	function formatCurrency(value) {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(value);
	}

	// Formatear porcentaje
	function formatPercentage(value) {
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
			
			const comparison = typeof aValue === 'string' 
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
					<th class="cursor-pointer td1" onclick={() => sortData('item')}>
						<div class="th2">Concepto</div>
					</th>
					<th class="cursor-pointer td2" onclick={() => sortData('presupuestoAcumulado')}>
						<div class="th1">Presupuesto</div>
					</th>
					<th class="cursor-pointer td2" onclick={() => sortData('gastoAcumulado')}>
						<div class="th1">Gasto</div>
					</th>
					<th class="cursor-pointer td2" onclick={() => sortData('diferencia')}>
						<div class="th1">Diferencia</div>
					</th>
					<th class="cursor-pointer td2" onclick={() => sortData('porcentaje')}>
						<div class="th1">% Ejecutado</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each budgetData as row (row.id)}
					<tr class="border-b hover:bg-gray-50">
						<td class="td1" data-label="Concepto">
							<span class="noshow">Concepto:</span>
							<span>{row.item}</span>
						</td>
						<td class="px-4 td2" data-label="Presupuesto">
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
		@apply bg-gray-50 text-gray-800;
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

    th3{
        @apply flex items-center justify-end;
    }

    th2{
        @apply flex items-center;
    }

    th1{
        @apply flex items-center justify-center;
    }
    .noshow{
            @apply md:hidden font-semibold;
        }

    .td1{
        @apply px-4 py-3 text-left font-bold;
    }
    .td2{
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
			@apply block mt-6;
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