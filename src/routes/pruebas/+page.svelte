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
