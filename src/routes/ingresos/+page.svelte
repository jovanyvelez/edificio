<!--
<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';

	const fechaActual = Temporal.Now.plainDateISO();

	const oldDate = Temporal.PlainDate.from('2024-02-01');

	const diferencia = oldDate.until(fechaActual, { largestUnit: 'months' }).months;
	//const mesesDiferencia = diferencia.months;


	const fechaHoraActual = Temporal.Now.plainDateTimeISO();

	const yearMonth = Temporal.PlainYearMonth.from({ year: 2025, month: 10 }); // => 2020-10

	const miFecha = yearMonth.toString() + '-' + yearMonth.daysInMonth.toString();

	const fecha1 = Temporal.PlainDate.from('2025-02-01');
	const fecha2 = Temporal.PlainDate.from('2026-01-31');
	const fecha3 = Temporal.PlainDate.from(miFecha);

	const estaEnRango = (
		fecha: Temporal.PlainDate,
		inicio: Temporal.PlainDate,
		fin: Temporal.PlainDate
	): boolean => {
		// ¿La fecha es igual o posterior a inicio? (diferencia no negativa)
		const desdeInicio = fecha.since(inicio).sign;
		// ¿La fecha es igual o anterior a fin? (diferencia no negativa)
		const hastaFin = fecha.until(fin).sign;

		return desdeInicio >= 0 && hastaFin >= 0;
	};

	const answ = estaEnRango(fecha3, fecha1, fecha2); // => true

	/*    console.log('Transacción registrada:', inserted[0].id);
    console.log(fechaActual);

    const horaActual = Temporal.Now.plainTimeISO();

    console.log(horaActual);


    console.log(fechaHoraActual); */
</script>

<main>
	<p>{fechaActual.toString()}</p>
	<p>{fechaHoraActual.toString()}</p>
	<p>{yearMonth.toString()}</p>
	<p>{miFecha}</p>
	<p>{diferencia}</p>
</main>
-->




<script lang="ts">
	import type { PageProps } from '../pruebas/$types';

	let { data }: PageProps = $props();

	const paymentsData = [
		{
			apartamento: '9801',
			total: 232000,
			abono_cuotas: 230902,
			interes: 1098
		},
		{
			apartamento: '9802',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{ apartamento: '9901', total: 0, abono_cuotas: 0, interes: 0 },
		{
			apartamento: '9902',
			total: 232000,
			abono_cuotas: 232000,
			interes: 0
		},
		{
			apartamento: '9903',
			total: 232000,
			abono_cuotas: 232000,
			interes: 0
		},
		{
			apartamento: '101',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{ apartamento: '102', total: 0, abono_cuotas: 0, interes: 0 },
		{
			apartamento: '103',
			total: 480000,
			abono_cuotas: 480000,
			interes: 0
		},
		{
			apartamento: '201',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{
			apartamento: '202',
			total: 432000,
			abono_cuotas: 432000,
			interes: 0
		},
		{
			apartamento: '203',
			total: 232900,
			abono_cuotas: 230875,
			interes: 2025
		},
		{
			apartamento: '301',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{
			apartamento: '302',
			total: 304000,
			abono_cuotas: 299823,
			interes: 4177
		},
		{
			apartamento: '303',
			total: 120000,
			abono_cuotas: 110119,
			interes: 9881
		},
		{
			apartamento: '401',
			total: 234000,
			abono_cuotas: 231001,
			interes: 2999
		},
		{
			apartamento: '402',
			total: 615000,
			abono_cuotas: 542947,
			interes: 72053
		},
		{
			apartamento: '403',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{
			apartamento: '501',
			total: 232000,
			abono_cuotas: 230902,
			interes: 1098
		},
		{
			apartamento: '502',
			total: 312000,
			abono_cuotas: 312000,
			interes: 0
		},
		{
			apartamento: '503',
			total: 233142,
			abono_cuotas: 232216,
			interes: 926
		}
	];

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

<div class="container mx-auto px-4 py-8">
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
						<td
							class="td2"
							data-label="Interés"
						>
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
		@apply flex justify-end items-center;
	}

	.th2 {
		@apply flex justify-start items-center;
	}

	.t1 {
		@apply px-4 py-3 text-left;
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
	}
</style>