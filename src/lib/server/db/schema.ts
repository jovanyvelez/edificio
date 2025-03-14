import { sqliteTable, check, integer, text, numeric, foreignKey, index, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const categoriasTransaccion = sqliteTable("categorias_transaccion", {
	id: integer().primaryKey(),
	nombre: text().notNull(),
	tipo: text().notNull(),
	descripcion: text(),
	activo: numeric().default(1),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const itemsPpto = sqliteTable("items_ppto", {
	id: integer().primaryKey(),
	nombre: text().notNull(),
	idCategoria: integer("id_categoria").notNull().references(() => categoriasTransaccion.id),
	descripcion: text(),
	activo: numeric().default(1),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const ppto = sqliteTable("ppto", {
	id: integer().primaryKey({ autoIncrement: true }),
	idItem: integer("id_item").notNull().references(() => itemsPpto.id),
	ano: integer().notNull(),
	mes: integer().notNull(),
	valor: real().notNull(),
	fechaCreacion: numeric("fecha_creacion").default(sql`(CURRENT_TIMESTAMP)`),
	fechaModificacion: numeric("fecha_modificacion"),
},
(table) => [
	index("idx_ppto_item_ano_mes").on(table.idItem, table.ano, table.mes),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const transacciones = sqliteTable("transacciones", {
	id: integer().primaryKey({ autoIncrement: true }),
	idItem: integer("id_item").notNull().references(() => itemsPpto.id),
	ano: integer().notNull(),
	mes: integer().notNull(),
	tipo: text().notNull(),
	monto: real().notNull(),
	fechaTransaccion: numeric("fecha_transaccion").notNull(),
	descripcion: text(),
	comprobante: text(),
	idUsuario: integer("id_usuario").notNull().references(() => usuarios.id),
	idApartamento: integer("id_apartamento").references(() => apartamentos.id),
	fechaRegistro: numeric("fecha_registro").default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	index("idx_transacciones_tipo").on(table.tipo),
	index("idx_transacciones_item_ano_mes").on(table.idItem, table.ano, table.mes),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const cuotasAdministracion = sqliteTable("cuotas_administracion", {
	id: integer().primaryKey({ autoIncrement: true }),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	idCategoria: integer("id_categoria").notNull().references(() => categoriasTransaccion.id),
	valor: real().notNull(),
	fechaInicio: numeric("fecha_inicio").notNull(),
	fechaFin: numeric("fecha_fin").notNull(),
	fechaCreacion: numeric("fecha_creacion").default(sql`(CURRENT_TIMESTAMP)`),
	fechaModificacion: numeric("fecha_modificacion"),
},
(table) => [
	index("idx_cuotas_apartamento").on(table.idApartamento),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const pagosCuotas = sqliteTable("pagos_cuotas", {
	id: integer().primaryKey({ autoIncrement: true }),
	idCuota: integer("id_cuota").notNull().references(() => cuotasAdministracion.id),
	idTransaccion: integer("id_transaccion").notNull().references(() => transacciones.id),
	montoPrincipal: real("monto_principal").notNull(),
	montoInteres: real("monto_interes"),
	fechaPago: numeric("fecha_pago").notNull(),
	metodoPago: text("metodo_pago"),
	comprobante: text(),
	notas: text(),
},
(table) => [
	index("idx_pagos_cuota").on(table.idCuota),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const aprobacionesExceso = sqliteTable("aprobaciones_exceso", {
	id: integer().primaryKey({ autoIncrement: true }),
	idTransaccion: integer("id_transaccion").notNull().references(() => transacciones.id),
	idConsejero: integer("id_consejero").notNull().references(() => usuarios.id),
	fechaAprobacion: numeric("fecha_aprobacion").default(sql`(CURRENT_TIMESTAMP)`),
	justificacion: text().notNull(),
	documentoRespaldo: text("documento_respaldo"),
},
(table) => [
	index("idx_aprobaciones_transaccion").on(table.idTransaccion),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const tiposUsuario = sqliteTable("tipos_usuario", {
	id: integer().primaryKey(),
	tipo: text().notNull(),
	descripcion: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const usuarios = sqliteTable("usuarios", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text().notNull(),
	apellido: text().notNull(),
	email: text(),
	telefono: text(),
	username: text().notNull(),
	password: text().notNull(),
	idTipoUsuario: integer("id_tipo_usuario").notNull().references(() => tiposUsuario.id),
	fechaRegistro: numeric("fecha_registro").default(sql`(CURRENT_TIMESTAMP)`),
	activo: numeric().default(1),
},
(table) => [
	index("idx_usuarios_tipo").on(table.idTipoUsuario),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const apartamentos = sqliteTable("apartamentos", {
	id: integer().primaryKey({ autoIncrement: true }),
	numero: text().notNull(),
	piso: integer(),
	area: real(),
	idPropietario: integer("id_propietario").references(() => usuarios.id),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const historialCambios = sqliteTable("historial_cambios", {
	id: integer().primaryKey({ autoIncrement: true }),
	tabla: text().notNull(),
	idRegistro: integer("id_registro").notNull(),
	accion: text().notNull(),
	idUsuario: integer("id_usuario").notNull().references(() => usuarios.id),
	fecha: numeric().default(sql`(CURRENT_TIMESTAMP)`),
	detalles: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const tasasInteres = sqliteTable("tasas_interes", {
	id: integer().primaryKey({ autoIncrement: true }),
	ano: integer().notNull(),
	mes: integer().notNull(),
	tasaMensual: real("tasa_mensual").notNull(),
	tasaAnual: real("tasa_anual").notNull(),
	descripcion: text(),
	fechaRegistro: numeric("fecha_registro").default(sql`(CURRENT_TIMESTAMP)`),
	idUsuario: integer("id_usuario").notNull().references(() => usuarios.id),
},
(table) => [
	index("idx_tasas_periodo").on(table.ano, table.mes),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

