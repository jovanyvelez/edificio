import { db as dataBase } from '$lib/server/db/index';
import { apartamentos, itemsPpto, categoriasTransaccion, ppto } from '$lib/server/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { Temporal } from '@js-temporal/polyfill';

//tipos para tipado estricto

interface Apartamento {
	id: number;
	numero: string;
}

interface Ingresos {
	id: number;
	nombre: string;
}

class consultas_tablas {
	db: typeof dataBase = dataBase;
	private apartments: Array<Apartamento> = [];
	private ingresos: Array<Ingresos> = [];

	async getApartamentos(): Promise<Apartamento[]> {
		await this.aptoCodNum();
		return this.apartments;
	}

	async getArrayAPartamentos():Promise<string[]>{
    const aptos = await this.getApartamentos();
    const apartmentsName = aptos.map((apto: Apartamento) => {
      return apto.numero
    });
    return apartmentsName;
	}

  async nombreItems(): Promise<{id:number, nombre:string}[]>{

				const ano = Temporal.Now.plainDateISO().year;
				const items = await this.db
						.selectDistinct({ id: itemsPpto.id, nombre: itemsPpto.nombre })
						.from(itemsPpto)
						.innerJoin(ppto, eq(itemsPpto.id, ppto.idItem))
						.innerJoin(categoriasTransaccion, eq(itemsPpto.idCategoria, categoriasTransaccion.id))
						.where(and(eq(ppto.ano, ano), eq(categoriasTransaccion.tipo, "GASTO")))
						.orderBy(sql`${itemsPpto.nombre}`);

				return items;
	}

	async getIngresos(): Promise<Ingresos[]> {
		await this.ingreso();
		return this.ingresos;
	}

	private async aptoCodNum(): Promise<void> {
		try {
			this.apartments = await this.db
				.select({ id: apartamentos.id, numero: apartamentos.numero })
				.from(apartamentos);
			//console.log(this.apartments)
		} catch (e) {
			console.error('Hubo un error en la consulta de apartamentos', e);
		}
	}
	private async ingreso(): Promise<void> {
		try {
			this.ingresos = await this.db
				.select({ id: itemsPpto.id, nombre: itemsPpto.nombre })
				.from(categoriasTransaccion)
				.innerJoin(itemsPpto, eq(categoriasTransaccion.id, itemsPpto.idCategoria))
				.where(eq(categoriasTransaccion.tipo,"INGRESO"));
		} catch (e) {
		  console.error('Hubo un error en la consulta de ingresos', e);
		}
	}
}

export { consultas_tablas };
