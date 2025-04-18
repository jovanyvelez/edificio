
import { GestorCuotasPendientes } from "$lib/server/db/orm/queries/generar_cuotas"



export const load = async () => {


  return{}


    const gestorCuotas = new GestorCuotasPendientes();

        // Generar cuotas para todos los apartamentos
    await gestorCuotas.generarCuotasParaTodosLosApartamentos();


}
