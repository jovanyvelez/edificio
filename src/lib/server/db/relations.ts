import { relations } from "drizzle-orm/relations";
import { categoriasTransaccion, itemsPpto, ppto, apartamentos, transacciones, usuarios, cuotasAdministracion, pagosCuotas, aprobacionesExceso, tiposUsuario, historialCambios, tasasInteres, saldosAFavor, cuotasAtrasadas, abonosInteres, cierresMensuales, detallesCierre, abonos } from "./schema";

export const itemsPptoRelations = relations(itemsPpto, ({ one, many }) => ({
	categoriasTransaccion: one(categoriasTransaccion, {
		fields: [itemsPpto.idCategoria],
		references: [categoriasTransaccion.id]
	}),
	pptos: many(ppto),
	transacciones: many(transacciones),
}));

export const categoriasTransaccionRelations = relations(categoriasTransaccion, ({ many }) => ({
	itemsPptos: many(itemsPpto),
	cuotasAdministracions: many(cuotasAdministracion),
}));

export const pptoRelations = relations(ppto, ({ one }) => ({
	itemsPpto: one(itemsPpto, {
		fields: [ppto.idItem],
		references: [itemsPpto.id]
	}),
}));

export const transaccionesRelations = relations(transacciones, ({ one, many }) => ({
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
	saldosAFavors: many(saldosAFavor),
	abonosInteres: many(abonosInteres),
	abonos: many(abonos)
}));

export const apartamentosRelations = relations(apartamentos, ({ one, many }) => ({
	transacciones: many(transacciones),
	cuotasAdministracions: many(cuotasAdministracion),
	usuario: one(usuarios, {
		fields: [apartamentos.idPropietario],
		references: [usuarios.id]
	}),
	saldosAFavors: many(saldosAFavor),
	cuotasAtrasadas: many(cuotasAtrasadas),
	abonosInteres: many(abonosInteres),
	detallesCierres: many(detallesCierre),
}));

export const usuariosRelations = relations(usuarios, ({ one, many }) => ({
	transacciones: many(transacciones),
	aprobacionesExcesos: many(aprobacionesExceso),
	tiposUsuario: one(tiposUsuario, {
		fields: [usuarios.idTipoUsuario],
		references: [tiposUsuario.id]
	}),
	apartamentos: many(apartamentos),
	historialCambios: many(historialCambios),
	tasasInteres: many(tasasInteres),
	cierresMensuales: many(cierresMensuales),
}));

export const cuotasAdministracionRelations = relations(cuotasAdministracion, ({ one, many }) => ({
	categoriasTransaccion: one(categoriasTransaccion, {
		fields: [cuotasAdministracion.idCategoria],
		references: [categoriasTransaccion.id]
	}),
	apartamento: one(apartamentos, {
		fields: [cuotasAdministracion.idApartamento],
		references: [apartamentos.id]
	}),
	pagosCuotas: many(pagosCuotas),
	cuotasAtrasadas: many(cuotasAtrasadas),
}));

export const pagosCuotasRelations = relations(pagosCuotas, ({ one }) => ({
	transaccione: one(transacciones, {
		fields: [pagosCuotas.idTransaccion],
		references: [transacciones.id]
	}),
	cuotasAdministracion: one(cuotasAdministracion, {
		fields: [pagosCuotas.idCuota],
		references: [cuotasAdministracion.id]
	}),
}));

export const aprobacionesExcesoRelations = relations(aprobacionesExceso, ({ one }) => ({
	usuario: one(usuarios, {
		fields: [aprobacionesExceso.idConsejero],
		references: [usuarios.id]
	}),
	transaccione: one(transacciones, {
		fields: [aprobacionesExceso.idTransaccion],
		references: [transacciones.id]
	}),
}));

export const tiposUsuarioRelations = relations(tiposUsuario, ({ many }) => ({
	usuarios: many(usuarios),
}));

export const historialCambiosRelations = relations(historialCambios, ({ one }) => ({
	usuario: one(usuarios, {
		fields: [historialCambios.idUsuario],
		references: [usuarios.id]
	}),
}));

export const tasasInteresRelations = relations(tasasInteres, ({ one }) => ({
	usuario: one(usuarios, {
		fields: [tasasInteres.idUsuario],
		references: [usuarios.id]
	}),
}));

export const saldosAFavorRelations = relations(saldosAFavor, ({ one }) => ({
	transaccione: one(transacciones, {
		fields: [saldosAFavor.idTransaccion],
		references: [transacciones.id]
	}),
	apartamento: one(apartamentos, {
		fields: [saldosAFavor.idApartamento],
		references: [apartamentos.id]
	}),
}));

export const cuotasAtrasadasRelations = relations(cuotasAtrasadas, ({ one, many }) => ({
	cuotasAdministracion: one(cuotasAdministracion, {
		fields: [cuotasAtrasadas.idCuota],
		references: [cuotasAdministracion.id]
	}),
	apartamento: one(apartamentos, {
		fields: [cuotasAtrasadas.idApartamento],
		references: [apartamentos.id]
	}),
	abonos: many(abonos)
}));

export const abonosACuotasRelations = relations(abonos, ({ one }) => ({
	transaccion: one(transacciones, {
		fields: [abonos.idTransaccion],
		references: [transacciones.id]
	}),
	pagos: one(cuotasAtrasadas, {
		fields: [abonos.idCuotaAtrasada],
		references: [cuotasAtrasadas.id]
	}),
}));


export const abonosInteresRelations = relations(abonosInteres, ({ one }) => ({
	transaccion: one(transacciones, {
		fields: [abonosInteres.idTransaccion],
		references: [transacciones.id]
	}),
	apartamento: one(apartamentos, {
		fields: [abonosInteres.idApartamento],
		references: [apartamentos.id]
	}),
}));

export const cierresMensualesRelations = relations(cierresMensuales, ({ one, many }) => ({
	usuario: one(usuarios, {
		fields: [cierresMensuales.idUsuario],
		references: [usuarios.id]
	}),
	detallesCierres: many(detallesCierre),
}));

export const detallesCierreRelations = relations(detallesCierre, ({ one }) => ({
	apartamento: one(apartamentos, {
		fields: [detallesCierre.idApartamento],
		references: [apartamentos.id]
	}),
	cierresMensuale: one(cierresMensuales, {
		fields: [detallesCierre.idCierre],
		references: [cierresMensuales.id]
	}),
}));