Tengo una base de datos SQLite, con las siguientes tabla relevantes para mi pregunta:
-- Tabla para cuotas atrasadas, cada cierre mensual se genera una cuota atrasada o pendiente para el siguiente,
-- de cada apartamento
CREATE TABLE cuotas_atrasadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_cuota INTEGER NOT NULL,  -- Referencia a la cuota original
    monto_original REAL NOT NULL,
    saldo_pendiente REAL NOT NULL,  -- Monto que falta por pagar
    mes INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_modificacion TIMESTAMP,
    activo BOOLEAN DEFAULT 1,  -- Indica si la cuota atrasada sigue pendiente
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_cuota) REFERENCES cuotas_administracion(id)
);

-- Tabla para registrar el cierre mensual
CREATE TABLE cierres_mensuales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    fecha_cierre TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    estado TEXT DEFAULT 'COMPLETADO',
    notas TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    UNIQUE(ano, mes)
);

-- Tabla de control para detalles del proceso de cierre
CREATE TABLE detalles_cierre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cierre INTEGER NOT NULL,
    id_apartamento INTEGER NOT NULL,
    accion TEXT NOT NULL, -- 'CUOTA_ATRASADA', 'SALDO_APLICADO', etc.
    monto REAL,
    detalle TEXT,
    FOREIGN KEY (id_cierre) REFERENCES cierres_mensuales(id),
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id)
);


-- Tabla de cuotas de administración
CREATE TABLE cuotas_administracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    valor REAL NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias_transaccion(id),
    UNIQUE(id_apartamento, fecha_inicio, fecha_fin)
);
Además existen otras tablas como apartamentos, usuarios.
La idea es que al final del mes o inicio del siguiente, se corra un proceso de cierre, para generar  cuotas por pagar (-cuotas_atrasadas-) para cada apartamento para el mes inmediatamente siguiente al cierre. Hecho esto, para cada apartamento se deben sumar los saldos_a_favor, en caso de que existan y luego cerrar las obligaciones de pago recien creadas, o abonarles a la cuota pendiente recién creada.  Lo anterior dependiendo si la suma de esos sados a favor es menor, mayor o igual al monto de la obligación mensual. Es decir si los saldos a favor de un apartamento son inferiores, se abona y se registra el  nuevo  saldoPendiente, si los saldos a favor son iguales a la cuota, se cierra la cuota y se lleva el saldoPendiente a cero. En todos los casos de existencia de saldos a favor, estos deben cerrarse y en caso de que la suma de saldos pendientes sea mayor a la cuota del mes, esta cerrará y luego se crea un nuevo saldo a favor con el valor de la diferencia.
Además cada que se haga una de estas transacciones, se registrará "el pago" en la tabla abonos y también se registrará una transacción de INGRESO con documento de referencia con el id del registro de cierre y una anotación de "pago automatico de cuota". Para mayor contexto estoy usando typescript para realizar esas operaciones.

Igualmente te proporciono el schema de drizzle orm que diseñé para el mapeo de tablas:


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

export const categoriasTransaccion = sqliteTable("categorias_transaccion", {
	id: integer().primaryKey(),
	nombre: text().notNull(),
	tipo: text().notNull(),
	descripcion: text(),
	activo: numeric().default(sql`1`),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const cuotasAtrasadas = sqliteTable("cuotas_atrasadas", {
	id: integer().primaryKey({ autoIncrement: true }),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	idCuota: integer("id_cuota").notNull().references(() => cuotasAdministracion.id),
	montoOriginal: real("monto_original").notNull(),
	saldoPendiente: real("saldo_pendiente").notNull(),
	mes: integer().notNull(),
	ano: integer().notNull(),
	fechaVencimiento: numeric("fecha_vencimiento").notNull(),
	fechaRegistro: numeric("fecha_registro").notNull(),
	fechaModificacion: numeric("fecha_modificacion"),
	activo: integer({ mode: 'boolean' }).default(true),
},
(table) => [
	index("idx_cuotas_atrasadas_fecha").on(table.fechaVencimiento),
	index("idx_cuotas_atrasadas_apart").on(table.idApartamento, table.activo),
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
	activo: numeric().default(sql`1`),
},
(table) => [
	index("idx_usuarios_tipo").on(table.idTipoUsuario),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const cierresMensuales = sqliteTable("cierres_mensuales", {
	id: integer().primaryKey({ autoIncrement: true }),
	ano: integer().notNull(),
	mes: integer().notNull(),
	fechaCierre: numeric("fecha_cierre").default(sql`(CURRENT_TIMESTAMP)`),
	idUsuario: integer("id_usuario").notNull().references(() => usuarios.id),
	estado: text().default("COMPLETADO"),
	notas: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const detallesCierre = sqliteTable("detalles_cierre", {
	id: integer().primaryKey({ autoIncrement: true }),
	idCierre: integer("id_cierre").notNull().references(() => cierresMensuales.id),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	accion: text().notNull(),
	monto: real(),
	detalle: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);






Prompt #2









Tengo una base de datos SQLite, con las siguientes tabla relevantes para mi pregunta:
-- Tabla para cuotas atrasadas, cada cierre mensual se genera una cuota atrasada o pendiente para el siguiente,
-- de cada apartamento
CREATE TABLE cuotas_atrasadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_cuota INTEGER NOT NULL,  -- Referencia a la cuota original
    monto_original REAL NOT NULL,
    saldo_pendiente REAL NOT NULL,  -- Monto que falta por pagar
    mes INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_modificacion TIMESTAMP,
    activo BOOLEAN DEFAULT 1,  -- Indica si la cuota atrasada sigue pendiente
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_cuota) REFERENCES cuotas_administracion(id)
);

-- Tabla para registrar el cierre mensual
CREATE TABLE cierres_mensuales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    fecha_cierre TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    estado TEXT DEFAULT 'COMPLETADO',
    notas TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    UNIQUE(ano, mes)
);

-- Tabla de control para detalles del proceso de cierre
CREATE TABLE detalles_cierre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cierre INTEGER NOT NULL,
    id_apartamento INTEGER NOT NULL,
    accion TEXT NOT NULL, -- 'CUOTA_ATRASADA', 'SALDO_APLICADO', etc.
    monto REAL,
    detalle TEXT,
    FOREIGN KEY (id_cierre) REFERENCES cierres_mensuales(id),
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id)
);


-- Tabla de cuotas de administración
CREATE TABLE cuotas_administracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    valor REAL NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias_transaccion(id),
    UNIQUE(id_apartamento, fecha_inicio, fecha_fin)
);
Además existen otras tablas como apartamentos, usuarios.
La idea es que al final del mes o inicio del siguiente, se corra un proceso de cierre, para generar  cuotas por pagar (-cuotas_atrasadas-) para cada apartamento para el mes inmediatamente siguiente al cierre. Para mayor contexto estoy usando typescript para realizar esas operaciones.

Igualmente te proporciono el schema de drizzle orm que diseñé para el mapeo de tablas:


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

export const categoriasTransaccion = sqliteTable("categorias_transaccion", {
	id: integer().primaryKey(),
	nombre: text().notNull(),
	tipo: text().notNull(),
	descripcion: text(),
	activo: integer({mode:'boolean'}).default(true),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const cuotasAtrasadas = sqliteTable("cuotas_atrasadas", {
	id: integer().primaryKey({ autoIncrement: true }),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	idCuota: integer("id_cuota").notNull().references(() => cuotasAdministracion.id),
	montoOriginal: real("monto_original").notNull(),
	saldoPendiente: real("saldo_pendiente").notNull(),
	mes: integer().notNull(),
	ano: integer().notNull(),
	fechaVencimiento: numeric("fecha_vencimiento").notNull(),
	fechaRegistro: numeric("fecha_registro").notNull(),
	fechaModificacion: numeric("fecha_modificacion"),
	activo: integer({ mode: 'boolean' }).default(true),
},
(table) => [
	index("idx_cuotas_atrasadas_fecha").on(table.fechaVencimiento),
	index("idx_cuotas_atrasadas_apart").on(table.idApartamento, table.activo),
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
	activo: integer({mode:'boolean'}).default(),
},
(table) => [
	index("idx_usuarios_tipo").on(table.idTipoUsuario),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const cierresMensuales = sqliteTable("cierres_mensuales", {
	id: integer().primaryKey({ autoIncrement: true }),
	ano: integer().notNull(),
	mes: integer().notNull(),
	fechaCierre: numeric("fecha_cierre").default(sql`(CURRENT_TIMESTAMP)`),
	idUsuario: integer("id_usuario").notNull().references(() => usuarios.id),
	estado: text().default("COMPLETADO"),
	notas: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

export const detallesCierre = sqliteTable("detalles_cierre", {
	id: integer().primaryKey({ autoIncrement: true }),
	idCierre: integer("id_cierre").notNull().references(() => cierresMensuales.id),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	accion: text().notNull(),
	monto: real(),
	detalle: text(),
},
(table) => [
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);





Prompt #3









Tengo una base de datos SQLite, con las siguientes tabla relevantes para mi pregunta:
-- Tabla para cuotas atrasadas. Cuotas pendientes por pagar de cada apartamento para un año y mes determinado
CREATE TABLE cuotas_atrasadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_cuota INTEGER NOT NULL,  -- Referencia a la cuota original
    monto_original REAL NOT NULL,
    saldo_pendiente REAL NOT NULL,  -- Monto que falta por pagar
    mes INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_modificacion TIMESTAMP,
    activo BOOLEAN DEFAULT 1,  -- Indica si la cuota sigue pendiente de pago
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_cuota) REFERENCES cuotas_administracion(id)
);


-- Tabla de cuotas de administración
CREATE TABLE cuotas_administracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_apartamento INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    valor REAL NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias_transaccion(id),
    UNIQUE(id_apartamento, fecha_inicio, fecha_fin)
);
Además existen otras tablas como apartamentos y usuarios.
La idea es que necesito implementar en TypeScript, en lo posible usando POO y drizzle orm la lógica para crear las cuotas de cobro necesarias por apartamento, mes y año, a partir de la información consignada en la tabla cuotas_administración de acuerdo al rango de fechas mas reciente de cada apartamento

Igualmente te proporciono el schema de drizzle orm que diseñé para el mapeo de tablas:


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



export const cuotasAtrasadas = sqliteTable("cuotas_atrasadas", {
	id: integer().primaryKey({ autoIncrement: true }),
	idApartamento: integer("id_apartamento").notNull().references(() => apartamentos.id),
	idCuota: integer("id_cuota").notNull().references(() => cuotasAdministracion.id),
	montoOriginal: real("monto_original").notNull(),
	saldoPendiente: real("saldo_pendiente").notNull(),
	mes: integer().notNull(),
	ano: integer().notNull(),
	fechaVencimiento: numeric("fecha_vencimiento").notNull(),
	fechaRegistro: numeric("fecha_registro").notNull(),
	fechaModificacion: numeric("fecha_modificacion"),
	activo: integer({ mode: 'boolean' }).default(true),
},
(table) => [
	index("idx_cuotas_atrasadas_fecha").on(table.fechaVencimiento),
	index("idx_cuotas_atrasadas_apart").on(table.idApartamento, table.activo),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
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
	activo: integer({mode:'boolean'}).default(),
},
(table) => [
	index("idx_usuarios_tipo").on(table.idTipoUsuario),
	check("categorias_transaccion_check_1", sql`tipo IN ('INGRESO', 'GASTO'`),
	check("transacciones_check_2", sql`tipo IN ('INGRESO', 'GASTO'`),
]);

