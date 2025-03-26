// Tipos de datos para las entidades
export interface Apartamento {
  id: number;
  numero: string;
  piso: number;
}

export interface Transaccion {
  id?: number;
  id_item: number;
  ano: number;
  mes: number;
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  fecha_transaccion: Date;
  descripcion: string;
  comprobante?: string;
  id_usuario: number;
  id_apartamento?: number;
}

export interface CuotaAdministracion {
  id: number;
  id_apartamento: number;
  id_categoria: number;
  valor: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface PagoCuota {
  id?: number;
  id_cuota: number;
  id_transaccion: number;
  monto_principal: number;
  monto_interes: number;
  fecha_pago: Date;
  metodo_pago?: string;
  comprobante?: string;
  notas?: string;
  pago_completo: boolean;
}

export interface SaldoAFavor {
  id?: number;
  id_apartamento: number;
  monto: number;
  fecha_registro: Date;
  fecha_modificacion?: Date;
  activo: boolean;
  id_transaccion: number;
}

export interface CuotaAtrasada {
  id?: number;
  id_apartamento: number;
  id_cuota: number;
  monto_original: number;
  saldo_pendiente: number;
  mes: number;
  ano: number;
  fecha_vencimiento: Date;
  fecha_registro: Date;
  fecha_modificacion?: Date;
  activo: boolean;
}

export interface AbonoInteres {
  id?: number;
  id_apartamento: number;
  id_transaccion: number;
  monto: number;
  fecha_registro: Date;
  fecha_modificacion?: Date;
  activo: boolean;
}

export interface TasaInteres {
  id: number;
  ano: number;
  mes: number;
  tasa_mensual: number;
  tasa_anual: number;
}
