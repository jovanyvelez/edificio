
import type { PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { Temporal } from '@js-temporal/polyfill';
import { consultas_tablas } from "$lib/server/db/orm/queries/interface/pagos";
import { registrarNuevoPago } from "$lib/server/db/orm/queries/chequeo";

const schema = z.object({
  idTransaccion: z.number().int().gt(0),
  apartamento: z.number().int().min(1).max(20),
  monto:z.number().int().gte(1),
  fechaPago: z.string().date(),
  referencia: z.string().min(4).max(13),
  notas: z.string().max(300),
  user: z.number().int().default(1)
})


export const load: PageServerLoad = async () => {

  const form = await superValidate(zod(schema));
  //consultar los apartamentos del edificio
  const query = new consultas_tablas();
  const apartamentos = await query.getApartamentos();
  const ingresos = await query.getIngresos();

  return { apartamentos, ingresos, form };

}


export const actions = {
  default: async ({ request }: { request: Request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      // Return { form } and things will just work.
      return fail(400, { form });
    };

    const { data } = form;

    const fecha = Temporal.PlainDate.from(data.fechaPago);
    const year = fecha.year;
    const mes = fecha.month;

 //const respuesta = registrarNuevoPago(16, 3000000, 11, 2025, 3, "Prueba de pago", "comprobante 14", 1);


    const respuesta = await registrarNuevoPago(
        data.apartamento,
        data.monto,
        data.idTransaccion,
        year,
        mes,
        data.fechaPago,
        data.notas,
        data.referencia,
        1
    )

    console.log(respuesta)

    if(!respuesta.success){
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Return the form with a status message
    return message(form, 'Form posted successfully!');
  }
};
