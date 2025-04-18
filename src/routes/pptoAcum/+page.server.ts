
import { result } from "$lib/server/db/orm/queries/gastoAcum";

export const load = async () => {
    const budgetData = await result();
    return { budgetData };

}
