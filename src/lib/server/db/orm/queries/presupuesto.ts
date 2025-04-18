
import  {db}  from '$lib/server/db/index';
import { ppto, itemsPpto } from "$lib/server/db/schema";
import { eq, asc } from 'drizzle-orm';

export async function getFullPresupuesto(ano: number) {

    const presupuestos = await db
    .select({
      item_nombre: itemsPpto.nombre,
      mes: ppto.mes,
      valor: ppto.valor
    })
    .from(ppto)
    .innerJoin(itemsPpto, eq(ppto.idItem, itemsPpto.id))
    .where(eq(ppto.ano, ano))
    .orderBy(asc(ppto.mes), asc(itemsPpto.nombre));



    return presupuestos;
}
