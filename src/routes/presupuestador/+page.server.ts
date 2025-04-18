import { getFullPresupuesto } from "$lib/server/db/orm/queries/presupuesto";

export const load = async () => {
    const datos =await getFullPresupuesto(2025);
    return {
        datos
    };
}
