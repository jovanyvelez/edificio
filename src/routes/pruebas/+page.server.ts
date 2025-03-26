import { registrarNuevoPago } from "$lib/server/db/orm/queries/chequeo"
export const load = async () => {
    const respuesta = registrarNuevoPago(3, 3000000, 11, 2025, 3, "Prueba de pago", "comprobante 14", 1);

    return{respuesta}
}

