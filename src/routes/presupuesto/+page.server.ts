import { getFullPresupuesto } from "$lib/server/db/orm/queries/presupuesto";

export const load = async () => {
    const presupuesto = await getFullPresupuesto(2025);
    return {
        datos: presupuesto
    };
}