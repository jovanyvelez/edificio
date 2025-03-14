-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `categorias_transaccion` (
	`id` integer PRIMARY KEY,
	`nombre` text NOT NULL,
	`tipo` text NOT NULL,
	`descripcion` text,
	`activo` numeric DEFAULT 1,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE TABLE `items_ppto` (
	`id` integer PRIMARY KEY,
	`nombre` text NOT NULL,
	`id_categoria` integer NOT NULL,
	`descripcion` text,
	`activo` numeric DEFAULT 1,
	FOREIGN KEY (`id_categoria`) REFERENCES `categorias_transaccion`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE TABLE `ppto` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_item` integer NOT NULL,
	`ano` integer NOT NULL,
	`mes` integer NOT NULL,
	`valor` real NOT NULL,
	`fecha_creacion` numeric DEFAULT (CURRENT_TIMESTAMP),
	`fecha_modificacion` numeric,
	FOREIGN KEY (`id_item`) REFERENCES `items_ppto`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_ppto_item_ano_mes` ON `ppto` (`id_item`,`ano`,`mes`);--> statement-breakpoint
CREATE TABLE `transacciones` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_item` integer NOT NULL,
	`ano` integer NOT NULL,
	`mes` integer NOT NULL,
	`tipo` text NOT NULL,
	`monto` real NOT NULL,
	`fecha_transaccion` numeric NOT NULL,
	`descripcion` text,
	`comprobante` text,
	`id_usuario` integer NOT NULL,
	`id_apartamento` integer,
	`fecha_registro` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`id_apartamento`) REFERENCES `apartamentos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_item`) REFERENCES `items_ppto`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_transacciones_tipo` ON `transacciones` (`tipo`);--> statement-breakpoint
CREATE INDEX `idx_transacciones_item_ano_mes` ON `transacciones` (`id_item`,`ano`,`mes`);--> statement-breakpoint
CREATE TABLE `cuotas_administracion` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_apartamento` integer NOT NULL,
	`id_categoria` integer NOT NULL,
	`valor` real NOT NULL,
	`fecha_inicio` numeric NOT NULL,
	`fecha_fin` numeric NOT NULL,
	`fecha_creacion` numeric DEFAULT (CURRENT_TIMESTAMP),
	`fecha_modificacion` numeric,
	FOREIGN KEY (`id_categoria`) REFERENCES `categorias_transaccion`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_apartamento`) REFERENCES `apartamentos`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_cuotas_apartamento` ON `cuotas_administracion` (`id_apartamento`);--> statement-breakpoint
CREATE TABLE `pagos_cuotas` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_cuota` integer NOT NULL,
	`id_transaccion` integer NOT NULL,
	`monto_principal` real NOT NULL,
	`monto_interes` real DEFAULT 0,
	`fecha_pago` numeric NOT NULL,
	`metodo_pago` text,
	`comprobante` text,
	`notas` text,
	FOREIGN KEY (`id_transaccion`) REFERENCES `transacciones`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_cuota`) REFERENCES `cuotas_administracion`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_pagos_cuota` ON `pagos_cuotas` (`id_cuota`);--> statement-breakpoint
CREATE TABLE `aprobaciones_exceso` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`id_transaccion` integer NOT NULL,
	`id_consejero` integer NOT NULL,
	`fecha_aprobacion` numeric DEFAULT (CURRENT_TIMESTAMP),
	`justificacion` text NOT NULL,
	`documento_respaldo` text,
	FOREIGN KEY (`id_consejero`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_transaccion`) REFERENCES `transacciones`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_aprobaciones_transaccion` ON `aprobaciones_exceso` (`id_transaccion`);--> statement-breakpoint
CREATE TABLE `tipos_usuario` (
	`id` integer PRIMARY KEY,
	`tipo` text NOT NULL,
	`descripcion` text,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`nombre` text NOT NULL,
	`apellido` text NOT NULL,
	`email` text,
	`telefono` text,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`id_tipo_usuario` integer NOT NULL,
	`fecha_registro` numeric DEFAULT (CURRENT_TIMESTAMP),
	`activo` numeric DEFAULT 1,
	FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipos_usuario`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_usuarios_tipo` ON `usuarios` (`id_tipo_usuario`);--> statement-breakpoint
CREATE TABLE `apartamentos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`numero` text NOT NULL,
	`piso` integer,
	`area` real,
	`id_propietario` integer,
	FOREIGN KEY (`id_propietario`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE TABLE `historial_cambios` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`tabla` text NOT NULL,
	`id_registro` integer NOT NULL,
	`accion` text NOT NULL,
	`id_usuario` integer NOT NULL,
	`fecha` numeric DEFAULT (CURRENT_TIMESTAMP),
	`detalles` text,
	FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE TABLE `tasas_interes` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`ano` integer NOT NULL,
	`mes` integer NOT NULL,
	`tasa_mensual` real NOT NULL,
	`tasa_anual` real NOT NULL,
	`descripcion` text,
	`fecha_registro` numeric DEFAULT (CURRENT_TIMESTAMP),
	`id_usuario` integer NOT NULL,
	FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "categorias_transaccion_check_1" CHECK(tipo IN ('INGRESO', 'GASTO'),
	CONSTRAINT "transacciones_check_2" CHECK(tipo IN ('INGRESO', 'GASTO')
);
--> statement-breakpoint
CREATE INDEX `idx_tasas_periodo` ON `tasas_interes` (`ano`,`mes`);
*/