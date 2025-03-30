import { Temporal } from '@js-temporal/polyfill';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index';
import {
    cuotasAdministracion,
    cuotasAtrasadas,
    apartamentos
} from '$lib/server/db/schema';




// Tipos para tipado estricto

type CuotaAdministracion = typeof cuotasAdministracion.$inferSelect;

interface MesAno { mes: number; ano: number };

class ServicioCuotasAdministracion {
    // Método para obtener la cuota más reciente de un apartamento
    async obtenerCuotaMasReciente(idApartamento: number): Promise<CuotaAdministracion | null> {
        const cuotas = await db.select()
            .from(cuotasAdministracion)
            .where(eq(cuotasAdministracion.idApartamento, idApartamento))
            .orderBy(sql`fecha_fin DESC`)
            .limit(1);

        return cuotas.length > 0 ? cuotas[0] as CuotaAdministracion : null;
    }

    // Método para generar cuotas para un rango de fechas específico
    async generarCuotasParaRango(cuota: CuotaAdministracion) {
        // Transacción para asegurar integridad
        await db.transaction(async (tx) => {

            // Obtener todos los meses del rango de la cuota
            const mesesCuota = this.obtenerMesesEnRango(
                cuota.fechaInicio,
                cuota.fechaFin
            );

            // Generar cuota para cada mes
            for (const { mes, ano } of mesesCuota) {
                // Verificar si ya existe una cuota para este mes y apartamento
                const cuotaExistente = await tx.select()
                    .from(cuotasAtrasadas)
                    .where(and(
                        eq(cuotasAtrasadas.idApartamento, cuota.idApartamento),
                        eq(cuotasAtrasadas.mes, mes),
                        eq(cuotasAtrasadas.ano, ano)
                    ))
                    .limit(1);

                const lastDay = (Temporal.PlainDate.from({ year: ano, month: mes, day: 1 })).daysInMonth;
                const fechaVencimiento = (Temporal.PlainDate.from({year: ano, month: mes, day:lastDay})).toString()
                // Si no existe, crear la cuota
                if (cuotaExistente.length === 0) {
                    await tx.insert(cuotasAtrasadas).values({
                        idApartamento: cuota.idApartamento,
                        idCuota: cuota.id,
                        montoOriginal: cuota.valor,
                        saldoPendiente: cuota.valor,
                        mes: mes,
                        ano: ano,
                        fechaVencimiento, // Último día del mes
                        fechaRegistro: Temporal.Now.plainDateISO().toString(),
                        activo: true
                    });

                    console.log(`Generada cuota para apartamento ${cuota.idApartamento} - ${mes}/${ano}`);
                }
            }
        });
    }

    // Método para obtener todos los meses en un rango de fechas

    private obtenerMesesEnRango(fecha1: string, fecha2: string): MesAno[] {
        const meses: MesAno[] = [];
        let ahora = Temporal.PlainDate.from(fecha1);
        const despues = Temporal.PlainDate.from(fecha2);

        // Comparación correcta usando compare
        while (Temporal.PlainDate.compare(ahora, despues) <= 0) {
            meses.push({
                mes: ahora.month,
                ano: ahora.year
            });

            // Asignar el nuevo valor (Temporal es inmutable)
            ahora = ahora.add({ months: 1 });
        }

        return meses;
    }
}

// Clase gestora para orquestar el proceso
class GestorCuotasPendientes {
    private servicioCuotas: ServicioCuotasAdministracion;

    constructor() {
        this.servicioCuotas = new ServicioCuotasAdministracion();
    }

    // Método para generar cuotas para todos los apartamentos
    async generarCuotasParaTodosLosApartamentos() {
        try {
            // Obtener todos los apartamentos
            const apartamentosRegistrados = await db.select({
                id: apartamentos.id,
                numero: apartamentos.numero
            }).from(apartamentos);

            // Procesar cada apartamento
            for (const apartamento of apartamentosRegistrados) {
                // Obtener la cuota más reciente
                const cuotaMasReciente = await this.servicioCuotas.obtenerCuotaMasReciente(apartamento.id);

                // Si existe cuota, generar cuotas para su rango
                if (cuotaMasReciente) {
                    await this.servicioCuotas.generarCuotasParaRango(cuotaMasReciente);
                } else {
                    console.warn(`No hay cuota para el apartamento ${apartamento.numero}`);
                }
            }

            console.log('Generación de cuotas completada');
        } catch (error) {
            console.error('Error al generar cuotas:', error);
            throw error;
        }
    }
}


// Ejemplo de uso
async function main() {
    const gestorCuotas = new GestorCuotasPendientes();

    // Generar cuotas para todos los apartamentos
    await gestorCuotas.generarCuotasParaTodosLosApartamentos();
}

export {
    ServicioCuotasAdministracion,
    GestorCuotasPendientes,
};
