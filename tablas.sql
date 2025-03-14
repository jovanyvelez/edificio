-- Tabla de categorías de transacción
CREATE TABLE categorias_transaccion (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('INGRESO', 'GASTO')),
    descripcion TEXT,
    activo BOOLEAN DEFAULT 1
);

-- Insertar categorías predefinidas
INSERT INTO categorias_transaccion (id, nombre, tipo, descripcion) VALUES 
(1, 'Cuota de administración', 'INGRESO', 'Pagos mensuales de cuotas de administración'),
(2, 'Intereses por mora', 'INGRESO', 'Intereses generados por pagos atrasados'),
(3, 'Donaciones', 'INGRESO', 'Donaciones voluntarias de propietarios u otros'),
(4, 'Mantenimiento', 'GASTO', 'Gastos de mantenimiento del edificio'),
(5, 'Servicios públicos', 'GASTO', 'Pagos de servicios como agua, luz, etc.'),
(6, 'Nómina', 'GASTO', 'Pagos a personal de administración y mantenimiento');

-- Tabla de items de presupuesto (modificada)
CREATE TABLE items_ppto (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    id_categoria INTEGER NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT 1,
    FOREIGN KEY (id_categoria) REFERENCES categorias_transaccion(id)
);

-- Tabla de presupuestos
CREATE TABLE ppto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_item INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    valor REAL NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    FOREIGN KEY (id_item) REFERENCES items_ppto(id),
    UNIQUE(id_item, ano, mes)
);

-- Tabla de transacciones (reemplaza ejecucion_ppto)
CREATE TABLE transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_item INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('INGRESO', 'GASTO')),
    monto REAL NOT NULL,
    fecha_transaccion DATE NOT NULL,
    descripcion TEXT,
    comprobante TEXT,
    id_usuario INTEGER NOT NULL,
    id_apartamento INTEGER, -- Para relacionar con pagos de departamentos específicos
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_item) REFERENCES items_ppto(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
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


-- Tabla de pagos de cuotas
CREATE TABLE pagos_cuotas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cuota INTEGER NOT NULL,
    id_transaccion INTEGER NOT NULL,
    monto_principal REAL NOT NULL,
    monto_interes REAL DEFAULT 0,
    fecha_pago DATE NOT NULL,
    metodo_pago TEXT,
    comprobante TEXT,
    notas TEXT,
    FOREIGN KEY (id_cuota) REFERENCES cuotas_administracion(id),
    FOREIGN KEY (id_transaccion) REFERENCES transacciones(id)
);

-- Tabla de aprobaciones de exceso de presupuesto (modificada)
CREATE TABLE aprobaciones_exceso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_transaccion INTEGER NOT NULL,
    id_consejero INTEGER NOT NULL,
    fecha_aprobacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    justificacion TEXT NOT NULL,
    documento_respaldo TEXT,
    FOREIGN KEY (id_transaccion) REFERENCES transacciones(id),
    FOREIGN KEY (id_consejero) REFERENCES usuarios(id)
);

-- Tabla de tipos de usuario
CREATE TABLE tipos_usuario (
    id INTEGER PRIMARY KEY,
    tipo TEXT NOT NULL,
    descripcion TEXT
);

-- Datos iniciales para tipos de usuario
INSERT INTO tipos_usuario (id, tipo, descripcion) VALUES 
(1, 'Administrador', 'Administrador del edificio'),
(2, 'Propietario', 'Propietario de departamento'),
(3, 'Consejo', 'Miembro del consejo de administración');

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT UNIQUE,
    telefono TEXT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    id_tipo_usuario INTEGER NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT 1,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipos_usuario(id)
);

CREATE TABLE apartamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL,
    piso INTEGER,
    area REAL,
    id_propietario INTEGER,
    FOREIGN KEY (id_propietario) REFERENCES usuarios(id)
);

-- Tabla de historial de cambios
CREATE TABLE historial_cambios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tabla TEXT NOT NULL,
    id_registro INTEGER NOT NULL,
    accion TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalles TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla de tasas de interés establecidas por el Estado
CREATE TABLE tasas_interes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    tasa_mensual REAL NOT NULL,  -- Tasa de interés mensual en formato decimal (ej: 0.0125 para 1.25%)
    tasa_anual REAL NOT NULL,    -- Tasa de interés anual equivalente
    descripcion TEXT,            -- Referencia a la normativa o resolución
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL, -- Usuario que registró la tasa
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    UNIQUE(ano, mes)
);

-- Índice para búsquedas por período


-- Índices para mejorar el rendimiento
CREATE INDEX idx_ppto_item_ano_mes ON ppto(id_item, ano, mes);
CREATE INDEX idx_transacciones_item_ano_mes ON transacciones(id_item, ano, mes);
CREATE INDEX idx_transacciones_tipo ON transacciones(tipo);
CREATE INDEX idx_usuarios_tipo ON usuarios(id_tipo_usuario);
CREATE INDEX idx_cuotas_apartamento ON cuotas_administracion (id_apartamento);
CREATE INDEX idx_pagos_cuota ON pagos_cuotas(id_cuota);
CREATE INDEX idx_aprobaciones_transaccion ON aprobaciones_exceso(id_transaccion);
CREATE INDEX idx_tasas_periodo ON tasas_interes(ano, mes);