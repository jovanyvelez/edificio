//import { registrarNuevoPago } from "$lib/server/db/orm/queries/chequeo";
import { GestorCuotasPendientes } from "$lib/server/db/orm/queries/generar_cuotas"

export const load = async () => {
        //const respuesta = registrarNuevoPago(16, 3000000, 11, 2025, 3, "Prueba de pago", "comprobante 14", 1);
    const gestorCuotas = new GestorCuotasPendientes();

        // Generar cuotas para todos los apartamentos
    await gestorCuotas.generarCuotasParaTodosLosApartamentos();


    return{}
}
