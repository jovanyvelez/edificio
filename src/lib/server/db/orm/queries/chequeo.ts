
// Importar el módulo para manejar fechas
import { Temporal } from '@js-temporal/polyfill';

import { cuotasAdministracion, transacciones, cuotasAtrasadas, saldosAFavor, tasasInteres, abonosInteres as pagoInteres, abonos } from "$lib/server/db/schema";
import { db as Database } from '$lib/server/db/index';

// importar tipos necesarios para el tipado de las transacciones
import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import type { ResultSet } from "@libsql/client";
import { lte, gte, desc, and, eq, sql } from 'drizzle-orm';

// Definir un tipo para las transacciones
type Trans = SQLiteTransaction<"async", ResultSet, any, any>;

interface Transacc {
    id: number;
    id_item: number;
    ano: number;
    mes: number;
    tipo: 'INGRESO' | 'GASTO';
    monto: number;
    fecha_transaccion: string;
    descripcion: string;
    comprobante: string;
    id_usuario: number;
    id_apartamento: number | null;
}

type CuotaAdministracion = typeof cuotasAdministracion.$inferSelect

type CuotaAtrasada = typeof cuotasAtrasadas.$inferSelect;
type SaldoAFavor = typeof saldosAFavor.$inferSelect;


class ProcesadorPagos {

    private db: typeof Database = Database;
    private idCuota: number = 0;


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

        try {
            await this.db.transaction(
                async (tx) => {
                    // 1. Registrar la transacción
                    const transaccionId = await this.registrarTransaccion(tx, {
                        id_item: idItem,
                        ano,
                        mes,
                        tipo: 'INGRESO',
                        monto,
                        fecha_transaccion: Temporal.Now.plainDateTimeISO().toString(),
                        descripcion,
                        comprobante,
                        id_usuario: idUsuario,
                        id_apartamento: idApartamento
                    });
                    console.log("Transacción grabada")

                    // 2. Obtener la cuota de administración vigente
                    const cuota = await this.obtenerCuotaVigente(tx, idApartamento, ano, mes);
                    console.log(cuota)
                    if (!cuota) {
                        tx.rollback();
                    }

                    console.log("cuota obtenida")

                    // 3. Verificar si existen cuotas atrasadas
                    const cuotasAtrasadas = await this.obtenerCuotasAtrasadas(tx, idApartamento);

                    console.log("Total del cuotas atrasadas: ", cuotasAtrasadas.length);

                    // 4. Verificar si existen saldos a favor
                    const saldosAFavor = await this.obtenerSaldosAFavor(tx, idApartamento);

                    console.log("saldos a favor")
                    const totalSaldosAFavor = saldosAFavor.reduce((total, saldo) => total + saldo.monto, 0);

                    console.log("Total saldo a favor: ", totalSaldosAFavor);


                    // 5. Procesar el pago según los diferentes escenarios
                    if (cuotasAtrasadas.length > 0) {
                        // Escenario 6: Hay cuotas atrasadas
                        await this.procesarPagoConCuotasAtrasadas(tx, idApartamento, monto, cuotasAtrasadas, transaccionId, ano, mes);
                    } else {
                        // Escenario 5: Hay saldos a favor
                        await this.registrarSaldoAFavor(tx, idApartamento, nuevoExcedente, idTransaccion);
                    }

                    tx.rollback();

                },
                {
                    behavior: "deferred",
                }
            );

        } catch (e) {
            console.log("hubo un pequeño error");
            console.log(e);
        }
    }

    private async registrarTransaccion(tx: Trans, transaccion: Omit<Transacc, 'id'>): Promise<number> {

        const inserted = await tx.insert(transacciones).values({
            idItem: transaccion.id_item,
            ano: transaccion.ano,
            mes: transaccion.mes,
            tipo: transaccion.tipo,
            monto: transaccion.monto,
            fechaTransaccion: transaccion.fecha_transaccion,
            descripcion: transaccion.descripcion,
            comprobante: transaccion.comprobante,
            idUsuario: transaccion.id_usuario,
            idApartamento: transaccion.id_apartamento
        }).returning();

        return inserted[0].id || 0;
    }


    /**
    * Obtiene la cuota de administración vigente para un apartamento y periodo
    */

    private async obtenerCuotaVigente(tx: Trans, idApartamento: number, ano: number, mes: number): Promise<CuotaAdministracion> {

        const yearMonth = Temporal.PlainYearMonth.from({ year: ano, month: mes });
        const miFecha = yearMonth.toString() + '-' + yearMonth.daysInMonth.toString();
        const cuota = await tx.select().from(cuotasAdministracion).where(
            and(
                eq(cuotasAdministracion.idApartamento, idApartamento),
                lte(cuotasAdministracion.fechaInicio, miFecha),
                gte(cuotasAdministracion.fechaFin, miFecha)
            )
        ).orderBy(desc(cuotasAdministracion.fechaInicio));



        return cuota[0];
    }

    private async obtenerCuotasAtrasadas(tx: Trans, idApartamento: number): Promise<CuotaAtrasada[]> {

        const atrasadas = await tx.select().from(cuotasAtrasadas).where(
            and(
                eq(cuotasAtrasadas.idApartamento, idApartamento),
                eq(cuotasAtrasadas.activo, true)
            )).orderBy(cuotasAtrasadas.ano, cuotasAtrasadas.mes);

        return atrasadas;
    }

    /**
   * Obtiene los saldos a favor activos para un apartamento
   */
    private async obtenerSaldosAFavor(tx: Trans, idApartamento: number): Promise<SaldoAFavor[]> {

        const saldos = await tx.select().from(saldosAFavor).where(
            and(
                eq(saldosAFavor.idApartamento, idApartamento),
                eq(saldosAFavor.activo, true)
            )).orderBy(saldosAFavor.fechaRegistro);

        return saldos;
    }

    /**
     * Calcula intereses para cuotas atrasadas
     */
    private async calcularIntereses(tx: Trans, Atrasadas: CuotaAtrasada[]): Promise<{ total: number, detallesPorCuota: Array<{ idCuota: number, interes: number }> }> {

        const detallesPorCuota: Array<{ idCuota: number, interes: number }> = [];
        let totalIntereses = 0;
        let saldoAnterior = 0;

        for (const cuota of Atrasadas) {
            // Obtener la tasa de interés para el periodo de la cuota
            const tasa = await tx.select().from(tasasInteres).where(
                and(
                    eq(tasasInteres.ano, cuota.ano),
                    eq(tasasInteres.mes, cuota.mes)
                )
            );

            if (tasa.length > 0) {
                // Calcular el interés para la cuota
                let interesCuota = (cuota.saldoPendiente + saldoAnterior) * tasa[0].tasaMensual / 100;
                saldoAnterior += cuota.saldoPendiente + interesCuota;
                totalIntereses += interesCuota;
                detallesPorCuota.push({ idCuota: cuota.id, interes: interesCuota });
            }
        }

        return { total: Math.trunc(totalIntereses), detallesPorCuota };
    }


    /**
    * Registra un abono a intereses
    */
    private async registrarAbonoInteres(tx: Trans, idApartamento: number, monto: number, idTransaccion: number): Promise<number> {

        const result = await tx.insert(pagoInteres).values({ idApartamento, idTransaccion, monto, fechaRegistro: Temporal.Now.plainDateISO().toString() }).returning();
        return result[0].id || 0;
    }

    /**
    * Cierra una cuota atrasada (la marca como inactiva)
    */
    private async cerrarCuotaAtrasada(tx: Trans, idCuota: number): Promise<void> {

        await tx.update(cuotasAtrasadas).
            set({ activo: false, saldoPendiente: 0, fechaModificacion: Temporal.Now.plainDateISO().toString() }).
            where(eq(cuotasAtrasadas.id, idCuota));
    }


    /**
    * Registra un saldo a favor para un apartamento
    */
    private async registrarSaldoAFavor(tx: Trans, idApartamento: number, monto: number, idTransaccion: number): Promise<number> {

        const result = await tx.insert(saldosAFavor).values({ idApartamento, monto, fechaRegistro: Temporal.Now.plainDateISO().toString(), idTransaccion }).returning();
        return result[0].id || 0;
    }

    /**
    * Aplica un pago a las cuotas atrasadas
    */
    private async aplicarPagoACuotasAtrasadas(
        tx: Trans,
        Atrasadas: CuotaAtrasada[],
        montoDisponible: number,
        idTransaccion: number,
    ): Promise<void> {

        //console.log(Atrasadas);


        if (montoDisponible <= 0) return;

        console.log(montoDisponible);

        for (const cuota of Atrasadas) {
            if (montoDisponible <= 0) return;
            //console.log(cuota);
            if (montoDisponible >= cuota.saldoPendiente) {
                console.log("Cierro cuota y registro abono");
                console.log(cuota.id);

                await this.cerrarCuotaAtrasada(tx, cuota.id);
                await tx.insert(abonos).values({ idCuotaAtrasada: cuota.id, idTransaccion, monto: cuota.saldoPendiente, fechaAbono: Temporal.Now.plainDateISO().toString() })
                montoDisponible = montoDisponible - cuota.saldoPendiente;
            } else {
                console.log("Abono cuota");
                await tx.update(cuotasAtrasadas).set({ saldoPendiente: cuota.saldoPendiente - montoDisponible }).where(eq(cuotasAtrasadas.id, cuota.id))
                await tx.insert(abonos).values({ idCuotaAtrasada: cuota.id, idTransaccion, monto: montoDisponible, fechaAbono: Temporal.Now.plainDateISO().toString() })
                montoDisponible = 0;
                
            }

        }


    }


    /**
    * Procesa un pago cuando hay cuotas atrasadas
    */
    private async procesarPagoConCuotasAtrasadas(
        tx: Trans,
        idApartamento: number,
        monto: number,
        cuotasAtrasadas: CuotaAtrasada[],
        idTransaccion: number,
        ano: number,
        mes: number
    ): Promise<void> {
        console.log("Inicio pago con cuotas atrasadas")
        // Calcular intereses
        const { total: totalIntereses, detallesPorCuota } = await this.calcularIntereses(tx, cuotasAtrasadas);

        console.log("total de intereses", totalIntereses)


        // Obtener abonos a interés activos

        const abonosInteres = await tx.select({ value: sql`sum(${pagoInteres.monto})`.mapWith(Number) }).
            from(pagoInteres).
            where(and(eq(pagoInteres.idApartamento, 3), eq(pagoInteres.activo, true)));

        const totalAbonosInteres = abonosInteres === null ? 0 : abonosInteres[0].value;

        const interesesPendientes = Math.max(0, totalIntereses - totalAbonosInteres);

        console.log("Intereses pendientes", interesesPendientes);
        console.log("Mont", monto);


        if (monto <= interesesPendientes) {
            // Escenario 6.1: El pago es menor o igual que los intereses pendientes
            await this.registrarAbonoInteres(tx, idApartamento, monto, idTransaccion);
        } else {
            // Escenario 6.2: El pago es mayor que los intereses pendientes

            // Registrar abono a intereses por el valor pendiente
            if (interesesPendientes > 0) {
                await this.registrarAbonoInteres(tx, idApartamento, interesesPendientes, idTransaccion);
            }

            console.log("Ya abonamos el interes")

            // Aplicar el excedente a las cuotas atrasadas
            let excedente = monto - interesesPendientes;
            const totalCuotasAtrasadas = cuotasAtrasadas.reduce((total, cuota) => total + cuota.saldoPendiente, 0);
            console.log("Valor de todas las cuotas: ", totalCuotasAtrasadas)

            if (excedente >= totalCuotasAtrasadas) {
                // Si el excedente cubre todas las cuotas atrasadas
                // Cerrar todas las cuotas atrasadas
                console.log("Se determina que excedente es mayor o iqual al total de las cuotas");

                for (const cuota of cuotasAtrasadas) {
                    await this.cerrarCuotaAtrasada(tx, cuota.id);
                }

                // Crear un saldo a favor con el excedente restante
                const nuevoExcedente = Math.max(0, excedente - totalCuotasAtrasadas);
                if (nuevoExcedente > 0) {
                    await this.registrarSaldoAFavor(tx, idApartamento, nuevoExcedente, idTransaccion);
                }
            } else {
                // Aplicar el excedente a las cuotas atrasadas, empezando por la más antigua
                console.log("Se determina que excedente no ALCANZA PARA PAGAR TODO");
                await this.aplicarPagoACuotasAtrasadas(tx, cuotasAtrasadas, excedente, idTransaccion);
            }
        }
    }

}


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
    procesador.procesarPago(
        idApartamento,
        monto,
        idItem,
        ano,
        mes,
        descripcion,
        comprobante,
        idUsuario
    );

    return { success: true, message: "Registro exitoso" };
}

