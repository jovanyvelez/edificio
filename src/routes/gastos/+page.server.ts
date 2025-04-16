import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { Temporal } from '@js-temporal/polyfill';
import { consultas_tablas } from '$lib/server/db/orm/queries/interface/pagos';
import { createTransation } from '$lib/server/db/orm/queries/ppt';

const schema = z.object({
	tipo: z.string().default('GASTO'),
	item: z.number().int().min(1).max(20),
	monto: z.number().int().gte(1),
	fechaPago: z.string().date(),
	referencia: z.string().min(4).max(13),
	notas: z.string().max(300),
	user: z.number().int().default(1)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	//consultar los apartamentos del edificio
	const query = new consultas_tablas();
	const items = await query.nombreItems();

	return { items, form };
};

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		const { data } = form;

		const fecha = Temporal.PlainDate.from(data.fechaPago);
		const year = fecha.year;
		const mes = fecha.month;

		type Data = {
			tipo: string;
			idItem: number;
			ano: number;
			mes: number;
			monto: number;
			fechaTransaccion: string;
			comprobante: string;
			descripcion: string;
			idUsuario: number;
		};
		const datos: Data = {
			tipo: data.tipo,
			idItem: data.item,
			ano: year,
			mes,
			monto: data.monto,
			fechaTransaccion: Temporal.PlainDateTime.from(data.fechaPago).toString(),
			comprobante: data.referencia,
			descripcion: data.notas,
			idUsuario: data.user
		};
		const respuesta = await createTransation(datos);
		if (respuesta.id === 0) return fail(400, { form });
		return message(form, 'Form posted successfully!');
	}
};
