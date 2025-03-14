import { relations } from "drizzle-orm/relations";
import { categoriasTransaccion, itemsPpto, ppto, apartamentos, transacciones, usuarios, cuotasAdministracion, pagosCuotas, aprobacionesExceso, tiposUsuario, historialCambios, tasasInteres } from "./schema";

export const itemsPptoRelations = relations(itemsPpto, ({one, many}) => ({
	categoriasTransaccion: one(categoriasTransaccion, {
		fields: [itemsPpto.idCategoria],
		references: [categoriasTransaccion.id]
	}),
	pptos: many(ppto),
	transacciones: many(transacciones),
}));

export const categoriasTransaccionRelations = relations(categoriasTransaccion, ({many}) => ({
	itemsPptos: many(itemsPpto),
	cuotasAdministracions: many(cuotasAdministracion),
}));

export const pptoRelations = relations(ppto, ({one}) => ({
	itemsPpto: one(itemsPpto, {
		fields: [ppto.idItem],
		references: [itemsPpto.id]
	}),
}));

export const transaccionesRelations = relations(transacciones, ({one, many}) => ({
	apartamento: one(apartamentos, {
		fields: [transacciones.idApartamento],
		references: [apartamentos.id]
	}),
	usuario: one(usuarios, {
		fields: [transacciones.idUsuario],
		references: [usuarios.id]
	}),
	itemsPpto: one(itemsPpto, {
		fields: [transacciones.idItem],
		references: [itemsPpto.id]
	}),
	pagosCuotas: many(pagosCuotas),
	aprobacionesExcesos: many(aprobacionesExceso),
}));

export const apartamentosRelations = relations(apartamentos, ({one, many}) => ({
	transacciones: many(transacciones),
	cuotasAdministracions: many(cuotasAdministracion),
	usuario: one(usuarios, {
		fields: [apartamentos.idPropietario],
		references: [usuarios.id]
	}),
}));

export const usuariosRelations = relations(usuarios, ({one, many}) => ({
	transacciones: many(transacciones),
	aprobacionesExcesos: many(aprobacionesExceso),
	tiposUsuario: one(tiposUsuario, {
		fields: [usuarios.idTipoUsuario],
		references: [tiposUsuario.id]
	}),
	apartamentos: many(apartamentos),
	historialCambios: many(historialCambios),
	tasasInteres: many(tasasInteres),
}));

export const cuotasAdministracionRelations = relations(cuotasAdministracion, ({one, many}) => ({
	categoriasTransaccion: one(categoriasTransaccion, {
		fields: [cuotasAdministracion.idCategoria],
		references: [categoriasTransaccion.id]
	}),
	apartamento: one(apartamentos, {
		fields: [cuotasAdministracion.idApartamento],
		references: [apartamentos.id]
	}),
	pagosCuotas: many(pagosCuotas),
}));

export const pagosCuotasRelations = relations(pagosCuotas, ({one}) => ({
	transaccione: one(transacciones, {
		fields: [pagosCuotas.idTransaccion],
		references: [transacciones.id]
	}),
	cuotasAdministracion: one(cuotasAdministracion, {
		fields: [pagosCuotas.idCuota],
		references: [cuotasAdministracion.id]
	}),
}));

export const aprobacionesExcesoRelations = relations(aprobacionesExceso, ({one}) => ({
	usuario: one(usuarios, {
		fields: [aprobacionesExceso.idConsejero],
		references: [usuarios.id]
	}),
	transaccione: one(transacciones, {
		fields: [aprobacionesExceso.idTransaccion],
		references: [transacciones.id]
	}),
}));

export const tiposUsuarioRelations = relations(tiposUsuario, ({many}) => ({
	usuarios: many(usuarios),
}));

export const historialCambiosRelations = relations(historialCambios, ({one}) => ({
	usuario: one(usuarios, {
		fields: [historialCambios.idUsuario],
		references: [usuarios.id]
	}),
}));

export const tasasInteresRelations = relations(tasasInteres, ({one}) => ({
	usuario: one(usuarios, {
		fields: [tasasInteres.idUsuario],
		references: [usuarios.id]
	}),
}));