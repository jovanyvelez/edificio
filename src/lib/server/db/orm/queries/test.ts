import { Temporal } from '@js-temporal/polyfill';
import { db } from '$lib/server/db/index';
import { eq, and, between, sum, sql } from 'drizzle-orm';
import { itemsPpto, ppto, transacciones } from '$lib/server/db/schema';

export async function result() {

	const fecha = Temporal.Now.plainDateISO();
	const año = fecha.year;
	const mesInicio = 1;
	const mesFin = fecha.month;

	

	// 1. Primero crear subconsultas equivalentes a los CTEs
	const presupuestoAcumuladoSubquery =  db
		.select({
			idItem: ppto.idItem,
			valorAcumulado: sum(ppto.valor).as('valor_acumulado')
		})
		.from(ppto)
		.where(and(eq(ppto.ano, año), between(ppto.mes, mesInicio, mesFin)))
		.groupBy(ppto.idItem)
		.as('presupuesto_acumulado');

	const gastosAcumuladosSubquery = db
		.select({
			idItem: transacciones.idItem,
			gastoAcumulado: sum(transacciones.monto).as('gasto_acumulado')	
		})
		.from(transacciones)
		.where(
			and(
				eq(transacciones.ano, año),
				between(transacciones.mes, mesInicio, mesFin),
				eq(transacciones.tipo, 'GASTO')
			)
		)
		.groupBy(transacciones.idItem)
		.as('gastos_acumulados');


	const miVar = sql`COALESCE(${gastosAcumuladosSubquery.gastoAcumulado}, 0)`;
	const otraVar = sql`${presupuestoAcumuladoSubquery.valorAcumulado} - ${miVar}`;

	// 2. Ahora usar estas subconsultas en la consulta principal
	const ans = await db
		.select({
			id: itemsPpto.id,
			item: itemsPpto.nombre,
			presupuestoAcumulado: sql<number>`${presupuestoAcumuladoSubquery.valorAcumulado}`,
			gastoAcumulado: miVar,
			diferencia:  	otraVar,
			porcentaje: sql`${miVar} / ${presupuestoAcumuladoSubquery.valorAcumulado} * 100`
		})
		.from(presupuestoAcumuladoSubquery)
		.innerJoin(itemsPpto, eq(presupuestoAcumuladoSubquery.idItem, itemsPpto.id))
		.leftJoin(
			gastosAcumuladosSubquery,
			eq(presupuestoAcumuladoSubquery.idItem, gastosAcumuladosSubquery.idItem)
		)
		.orderBy(itemsPpto.nombre);

	console.log(ans);
}
