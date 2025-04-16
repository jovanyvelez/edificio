import { transacciones } from '$lib/server/db/schema';
import { db as Database } from '$lib/server/db/index';

// Definir un tipo para las transacciones

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

class Transacciones {
	private db: typeof Database;

	constructor() {
		this.db = Database;
	}

	async create(data: Data) {
		try {
			return await this.db.insert(transacciones).values(data).returning({ id: transacciones.id });
		} catch (error) {
			console.error('Error creating transaction:', error);
			return [{ id: 0 }];
		}
	}
}

export async function createTransation(data: Data) {
	const [id] = await new Transacciones().create(data);
	return id;
}
