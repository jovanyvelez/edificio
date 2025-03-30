import { db as dataBase } from '$lib/server/db/index';
import { apartamentos, itemsPpto, categoriasTransaccion } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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
