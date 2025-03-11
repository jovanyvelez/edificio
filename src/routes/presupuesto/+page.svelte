<script>
	// Este componente recibe los datos como una prop
	const data = {
		gastosMensuales: [
			{
				mes: 'Enero',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 450000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 90000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 72000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 150000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Mant Equipo Bombeo',
						monto: 500000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 18000
					}
				],
				subtotal: 1189600,
				imprevistos: 118960,
				total: 1308560
			},
			{
				mes: 'Febrero',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 450000
					},
					{
						concepto: 'Reparación Tanque',
						monto: 3700000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 150000
					},
					{
						concepto: 'Bolsas basura',
						monto: 42500
					},
					{
						concepto: 'Reparación puertas',
						monto: 100000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Lavada Tanque de Agua',
						monto: 30000
					},
					{
						concepto: 'Insumos para cuidado del jardin',
						monto: 401000
					},
					{
						concepto: 'Asesoria Contable',
						monto: 200000
					},
					{
						concepto: 'Recarga Extintores',
						monto: 300000
					},
					{
						concepto: 'Reparación Fachada puerta cuarto basura',
						monto: 200000
					}
				],
				subtotal: 6103100,
				imprevistos: 610310,
				total: 6713410
			},
			{
				mes: 'Marzo',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 450000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 150000
					},
					{
						concepto: 'Bolsas basura',
						monto: 42500
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Impresión documentos',
						monto: 22000
					},
					{
						concepto: 'Asesoria Contable',
						monto: 200000
					}
				],
				subtotal: 1339600,
				imprevistos: 133960,
				total: 1473560
			},
			{
				mes: 'Abril',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Bolsas basura',
						monto: 42500
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Lavada Tanque de Agua',
						monto: 30000
					},
					{
						concepto: 'Reparación puertas',
						monto: 280000
					}
				],
				subtotal: 1560100,
				imprevistos: 156010,
				total: 1716110
			},
			{
				mes: 'Mayo',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Bolsas basura',
						monto: 42500
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Reparación Cerca en Malla plástica',
						monto: 180000
					}
				],
				subtotal: 1497600,
				imprevistos: 149760,
				total: 1647360
			},
			{
				mes: 'Junio',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					}
				],
				subtotal: 1290100,
				imprevistos: 129010,
				total: 1419110
			},
			{
				mes: 'Julio',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					}
				],
				subtotal: 1217600,
				imprevistos: 121760,
				total: 1339360
			},
			{
				mes: 'Agosto',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Insumos para cuidado del jardin',
						monto: 401000
					}
				],
				subtotal: 1618600,
				imprevistos: 161860,
				total: 1780460
			},
			{
				mes: 'Septiembre',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					}
				],
				subtotal: 1260100,
				imprevistos: 126010,
				total: 1386110
			},
			{
				mes: 'Octubre',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					}
				],
				subtotal: 1247600,
				imprevistos: 124760,
				total: 1372360
			},
			{
				mes: 'Noviembre',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					},
					{
						concepto: 'Canales Desague Externos Edificio',
						monto: 2600000
					}
				],
				subtotal: 3817600,
				imprevistos: 381760,
				total: 4199360
			},
			{
				mes: 'Diciembre',
				gastos: [
					{
						concepto: 'Aseo zonas comunes botada de basuras',
						monto: 493000
					},
					{
						concepto: 'Pago Servicios Públicos',
						monto: 190000
					},
					{
						concepto: 'Poda Arbustos perimetro edificio y cuidado jardin',
						monto: 160000
					},
					{
						concepto: 'Mant Citofono',
						monto: 87600
					},
					{
						concepto: 'Administración',
						monto: 165000
					},
					{
						concepto: 'Implementos de Aseo',
						monto: 16000
					},
					{
						concepto: 'Compra papeleria',
						monto: 6000
					},
					{
						concepto: 'Reparación techo',
						monto: 100000
					}
				],
				subtotal: 1460100,
				imprevistos: 146010,
				total: 1606110
			}
		],
		totalesAnuales: {
			subtotal: 23143860,
			imprevistos: 2360410,
			total: 25504270
		}
	};
	// Función para formatear montos como pesos colombianos
	const formatoPeso = (valor) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(valor);
	};

	// Extraer todos los conceptos únicos para las filas
	let conceptosUnicos = [];
	data.gastosMensuales.forEach((mes) => {
		mes.gastos.forEach((gasto) => {
			if (!conceptosUnicos.includes(gasto.concepto)) {
				conceptosUnicos.push(gasto.concepto);
			}
		});
	});
	conceptosUnicos.sort(); // Ordenar alfabéticamente

	// Función para obtener el monto de un concepto en un mes específico
	const obtenerMonto = (concepto, mes) => {
		const mesData = data.gastosMensuales.find((m) => m.mes === mes);
		if (!mesData) return null;

		const gasto = mesData.gastos.find((g) => g.concepto === concepto);
		return gasto ? gasto.monto : null;
	};

	// Meses para las columnas
	const meses = data.gastosMensuales.map((mes) => mes.mes);

	// Función para el total de cada concepto anual
	const totalConceptoAnual = (concepto) => {
		let total = 0;
		data.gastosMensuales.forEach((mes) => {
			const gasto = mes.gastos.find((g) => g.concepto === concepto);
			if (gasto) total += gasto.monto;
		});
		return total;
	};

	// Estados para filtrado y ordenamiento
	let filtroConcepto = '';
	let ordenColumna = '';
	let ordenAscendente = true;

	// Conceptos filtrados
	$: conceptosFiltrados = conceptosUnicos.filter((concepto) =>
		concepto.toLowerCase().includes(filtroConcepto.toLowerCase())
	);

	// Función para ordenar columnas
	const ordenarPor = (columna) => {
		if (ordenColumna === columna) {
			ordenAscendente = !ordenAscendente;
		} else {
			ordenColumna = columna;
			ordenAscendente = true;
		}
	};
</script>

<div class="container">
	<h2>Reporte de Gastos</h2>

	<input
		type="text"
		class="search-bar"
		placeholder="Filtrar por concepto..."
		bind:value={filtroConcepto}
	/>

	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th on:click={() => ordenarPor('concepto')}>
						Concepto
						{#if ordenColumna === 'concepto'}
							<span class="sort-indicator">{ordenAscendente ? '▲' : '▼'}</span>
						{/if}
					</th>
					{#each meses as mes}
						<th on:click={() => ordenarPor(mes)}>
							{mes}
							{#if ordenColumna === mes}
								<span class="sort-indicator">{ordenAscendente ? '▲' : '▼'}</span>
							{/if}
						</th>
					{/each}
					<th on:click={() => ordenarPor('total')}>
						Total Anual
						{#if ordenColumna === 'total'}
							<span class="sort-indicator">{ordenAscendente ? '▲' : '▼'}</span>
						{/if}
					</th>
				</tr>
			</thead>
			<tbody>
				{#each conceptosFiltrados as concepto}
					<tr>
						<td>{concepto}</td>
						{#each meses as mes}
							{@const monto = obtenerMonto(concepto, mes)}
							<td class={monto ? 'monto-cell' : 'empty-cell'}>
								{monto ? formatoPeso(monto) : ''}
							</td>
						{/each}
						<td class="monto-cell">{formatoPeso(totalConceptoAnual(concepto))}</td>
					</tr>
				{/each}

				<!-- Subtotal -->
				<tr class="total-row">
					<td>Subtotal</td>
					{#each meses as mes}
						{@const mesData = data.gastosMensuales.find((m) => m.mes === mes)}
						<td class="monto-cell">{formatoPeso(mesData.subtotal)}</td>
					{/each}
					<td class="monto-cell">{formatoPeso(data.totalesAnuales.subtotal)}</td>
				</tr>

				<!-- Imprevistos -->
				<tr class="imprevistos-row">
					<td>Imprevistos</td>
					{#each meses as mes}
						{@const mesData = data.gastosMensuales.find((m) => m.mes === mes)}
						<td class="monto-cell">{formatoPeso(mesData.imprevistos)}</td>
					{/each}
					<td class="monto-cell">{formatoPeso(data.totalesAnuales.imprevistos)}</td>
				</tr>

				<!-- Total General -->
				<tr class="grand-total-row">
					<td>Total</td>
					{#each meses as mes}
						{@const mesData = data.gastosMensuales.find((m) => m.mes === mes)}
						<td class="monto-cell">{formatoPeso(mesData.total)}</td>
					{/each}
					<td class="monto-cell">{formatoPeso(data.totalesAnuales.total)}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.container {
		font-family: Arial, sans-serif;
		max-width: 100%;
		overflow-x: auto;
	}

	.search-bar {
		margin: 1rem 0;
		padding: 0.5rem;
		width: 100%;
		max-width: 300px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: right;
	}

	th {
		background-color: #f2f2f2;
		font-weight: bold;
		position: sticky;
		top: 0;
		cursor: pointer;
	}

	th:first-child,
	td:first-child {
		text-align: left;
		position: sticky;
		left: 0;
		background-color: white;
		z-index: 10;
	}

	th:first-child {
		background-color: #f2f2f2;
		z-index: 11;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}

	tr:hover {
		background-color: #f1f1f1;
	}

	.total-row {
		font-weight: bold;
		background-color: #e6e6e6;
	}

	.imprevistos-row {
		font-style: italic;
		background-color: #f0f0f0;
	}

	.grand-total-row {
		font-weight: bold;
		background-color: #d9d9d9;
	}

	.monto-cell {
		text-align: right;
	}

	.empty-cell {
		background-color: #f9f9f9;
	}

	.sort-indicator {
		margin-left: 5px;
	}

	@media (max-width: 768px) {
		.container {
			font-size: 14px;
		}

		th,
		td {
			padding: 5px;
		}
	}
</style>
