
//import { GestorCuotasPendientes } from "$lib/server/db/orm/queries/generar_cuotas"


import { Temporal } from '@js-temporal/polyfill';
import { db } from '$lib/server/db/index';
import { eq, and, between, sum, sql, lte, gte } from 'drizzle-orm';
import { apartamentos, abonos, abonosInteres } from '$lib/server/db/schema';

export const load = async () => {

  const condicion = `WHERE substring(abonos.fechaAbono, 1, 4) = '2025'`;

  const pagos = await db.select({ id: abonos.idApartamento, total: sum(abonos.monto).as('pago') }).from(abonos).
    where(and(lte(abonos.fechaAbono, '2025-12-31'), gte(abonos.fechaAbono, '2025-01-01'))).
    groupBy(abonos.idApartamento).
    as('pagos');




  const intereses = await db.select({ id: abonosInteres.idApartamento, 
    total: sum(abonosInteres.monto).as('interes') }).from(abonosInteres).
    where(and(lte(abonosInteres.fechaRegistro, '2025-12-31'), gte(abonosInteres.fechaRegistro, '2025-01-01'))).
    groupBy(abonosInteres.idApartamento).
    as('intereses');


  const paymentsData = await db
    .select({
      apartamento: apartamentos.numero,
      total: sql`coalesce(${pagos.total}, 0) + coalesce(${intereses.total}, 0)`,
      abono_cuotas: sql`coalesce(${pagos.total}, 0)`,
      interes: sql`coalesce(${intereses.total}, 0)`}).
    from(apartamentos).
    leftJoin(pagos, eq(apartamentos.id, pagos.id)).
    leftJoin(intereses, eq(apartamentos.id, intereses.id))



  return {paymentsData}


  // const gestorCuotas = new GestorCuotasPendientes();

  // Generar cuotas para todos los apartamentos
  // await gestorCuotas.generarCuotasParaTodosLosApartamentos();


}
