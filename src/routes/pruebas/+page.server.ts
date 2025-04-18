
import { GestorCuotasPendientes } from "$lib/server/db/orm/queries/generar_cuotas"

import { result } from "$lib/server/db/orm/queries/test";

export const load = async () => {

  await result();
  return{}


        //const respuesta = registrarNuevoPago(16, 3000000, 11, 2025, 3, "Prueba de pago", "comprobante 14", 1);
    const gestorCuotas = new GestorCuotasPendientes();

        // Generar cuotas para todos los apartamentos
    await gestorCuotas.generarCuotasParaTodosLosApartamentos();


}
