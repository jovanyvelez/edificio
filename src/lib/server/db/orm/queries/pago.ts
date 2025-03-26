import { Temporal } from '@js-temporal/polyfill';
import {  transacciones, tiposUsuario } from "$lib/server/db/schema";
import { eq, asc } from 'drizzle-orm';
import { db as Database } from '$lib/server/db/index';


// Importar dependencias necesarias

/*import {
  AbonoInteres,
  Apartamento,
  CuotaAdministracion,
  CuotaAtrasada,
  PagoCuota,
  SaldoAFavor,
  TasaInteres,
  Transaccion
} from '$lib/server/types/de_pagos';
*/


interface SQLiteTransactionConfig {
  behavior?: 'deferred' | 'immediate' | 'exclusive';
}


/**
 * Clase principal para el procesamiento de pagos
 */
export class ProcesadorPagos {
  private db: typeof Database;

  constructor() {
    this.db = Database;
  }

  /**
   * Procesa un nuevo pago y aplica la lógica correspondiente
   */
  async procesarPago(
    idApartamento: number,
    monto: number,
    idItem: number,
    ano: number,
    mes: number,
    descripcion: string,
    comprobante: string,
    idUsuario: number
  ) {
    // Iniciamos una transacción SQL para garantizar la integridad de los datos

    await this.db.transaction(async (tx) => {
      try {
        // 1. Registrar la transacción

        await this.db.insert(tiposUsuario).values({tipo: 'TESTER', descripcion: 'Usuario de prueba'}).returning();
        console.log('Registrando transacción...');

        /*const transaccionId = await this.registrarTransaccion({
          id_item: idItem,
          ano,
          mes,
          tipo: 'INGRESO',
          monto,
          fecha_transaccion: new Date(Temporal.Now.plainDate.toString()),
          descripcion,
          comprobante,
          id_usuario: idUsuario,
          id_apartamento: idApartamento
        });*/

        console.log('Transacción registrada:', transaccionId);
        return {
          success: true,
          message: 'Pago procesado correctamente',
          transactionId: transaccionId
        };

      } catch (error) {
        console.error('Error al procesar el pago:', error);
        tx.rollback();
        return {
          success: false,
          message: `Error al procesar el pago: ${error instanceof Error ? error.message : String(error)}`,
          transactionId: 0
        };
      }
    }, {
      behavior: "deferred",
    });
  }



  /**
   * Registra una nueva transacción en la base de datos
   */

  private async registrarTransaccion(transaccion: Omit<Transaccion, 'id'>): Promise<number> {

    console.log(transaccion);
    const inserted = await this.db.insert(transacciones).values({
      idItem: transaccion.id_item,
      ano: transaccion.ano,
      mes: transaccion.mes,
      tipo: transaccion.tipo,
      monto: transaccion.monto,
      fechaTransaccion: transaccion.fecha_transaccion.toISOString(),
      descripcion: transaccion.descripcion,
      comprobante: transaccion.comprobante,
      idUsuario: transaccion.id_usuario,
      idApartamento: transaccion.id_apartamento
    }).returning();

    console.log('Transacción registrada:', inserted[0].id);
    return inserted[0].id || 0;
  }

}
/**
 * Ejemplo de uso de la clase ProcesadorPagos
 */
export async function registrarNuevoPago(

  idApartamento: number,
  monto: number,
  idItem: number,
  ano: number,
  mes: number,
  descripcion: string,
  comprobante: string,
  idUsuario: number
): Promise<{ success: boolean; message: string; transactionId?: number }> {
  const procesador = new ProcesadorPagos();
  return procesador.procesarPago(
    idApartamento,
    monto,
    idItem,
    ano,
    mes,
    descripcion,
    comprobante,
    idUsuario
  );
}
