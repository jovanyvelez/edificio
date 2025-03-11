<script>
	import { onMount } from 'svelte';
	
	// Datos del presupuesto
	const presupuestoData = {
	  "edificio": "EDIFICIO MIRADOR DE ALTAVISTA PH",
	  "presupuesto": {
		"año": 2025,
		"tipo": "GASTOS DEFINITIVO",
		"conceptos": [
		  {
			"concepto": "Aseo zonas comunes botada de basuras",
			"enero": 450000,
			"febrero": 450000,
			"marzo": 450000,
			"abril": 493000,
			"mayo": 493000,
			"junio": 493000,
			"julio": 493000,
			"agosto": 493000,
			"septiembre": 493000,
			"octubre": 493000,
			"noviembre": 493000,
			"diciembre": 493000
		  },
		  {
			"concepto": "Reparación Tanque",
			"enero": 3700000,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Pago Servicios Públicos",
			"enero": 90000,
			"febrero": 190000,
			"marzo": 190000,
			"abril": 190000,
			"mayo": 190000,
			"junio": 190000,
			"julio": 190000,
			"agosto": 190000,
			"septiembre": 190000,
			"octubre": 190000,
			"noviembre": 190000,
			"diciembre": 190000
		  },
		  {
			"concepto": "Poda Arbustos perimetro edificio y cuidado jardin",
			"enero": 72000,
			"febrero": 160000,
			"marzo": 160000,
			"abril": 160000,
			"mayo": 160000,
			"junio": 160000,
			"julio": 160000,
			"agosto": 160000,
			"septiembre": 160000,
			"octubre": 160000,
			"noviembre": 160000,
			"diciembre": 160000
		  },
		  {
			"concepto": "Insumos para cuidado del jardin",
			"enero": 0,
			"febrero": 401000,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 401000,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Mant Citofono",
			"enero": 87600,
			"febrero": 87600,
			"marzo": 87600,
			"abril": 87600,
			"mayo": 87600,
			"junio": 87600,
			"julio": 87600,
			"agosto": 87600,
			"septiembre": 87600,
			"octubre": 87600,
			"noviembre": 87600,
			"diciembre": 87600
		  },
		  {
			"concepto": "Lavada Tanque de Agua",
			"enero": 0,
			"febrero": 0,
			"marzo": 0,
			"abril": 30000,
			"mayo": 0,
			"junio": 30000,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Administración",
			"enero": 150000,
			"febrero": 150000,
			"marzo": 150000,
			"abril": 165000,
			"mayo": 165000,
			"junio": 165000,
			"julio": 165000,
			"agosto": 165000,
			"septiembre": 165000,
			"octubre": 165000,
			"noviembre": 165000,
			"diciembre": 165000
		  },
		  {
			"concepto": "Bolsas basura",
			"enero": 0,
			"febrero": 42500,
			"marzo": 0,
			"abril": 42500,
			"mayo": 0,
			"junio": 42500,
			"julio": 0,
			"agosto": 42500,
			"septiembre": 0,
			"octubre": 42500,
			"noviembre": 0,
			"diciembre": 42500
		  },
		  {
			"concepto": "Impresión documentos",
			"enero": 22000,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Reparación puertas",
			"enero": 0,
			"febrero": 100000,
			"marzo": 0,
			"abril": 280000,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Implementos de Aseo",
			"enero": 18000,
			"febrero": 16000,
			"marzo": 16000,
			"abril": 16000,
			"mayo": 16000,
			"junio": 16000,
			"julio": 16000,
			"agosto": 16000,
			"septiembre": 16000,
			"octubre": 16000,
			"noviembre": 16000,
			"diciembre": 16000
		  },
		  {
			"concepto": "Compra papeleria",
			"enero": 0,
			"febrero": 6000,
			"marzo": 6000,
			"abril": 6000,
			"mayo": 6000,
			"junio": 6000,
			"julio": 6000,
			"agosto": 6000,
			"septiembre": 6000,
			"octubre": 6000,
			"noviembre": 6000,
			"diciembre": 6000
		  },
		  {
			"concepto": "Reparación techo",
			"enero": 100000,
			"febrero": 100000,
			"marzo": 100000,
			"abril": 100000,
			"mayo": 100000,
			"junio": 100000,
			"julio": 100000,
			"agosto": 100000,
			"septiembre": 100000,
			"octubre": 100000,
			"noviembre": 100000,
			"diciembre": 100000
		  },
		  {
			"concepto": "Mant Equipo Bombeo",
			"enero": 0,
			"febrero": 500000,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Instalación sistema de cámaras",
			"enero": 0,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Canales Desague Externos Edificio",
			"enero": 0,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 2600000,
			"diciembre": 0
		  },
		  {
			"concepto": "Reparación Fachada puerta cuarto basura",
			"enero": 0,
			"febrero": 200000,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Compartir para diciembre",
			"enero": 0,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Reparación Cerca en Malla plástica",
			"enero": 0,
			"febrero": 180000,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  },
		  {
			"concepto": "Asesoria Contable",
			"enero": 200000,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 0,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 200000,
			"diciembre": 0
		  },
		  {
			"concepto": "Recarga Extintores",
			"enero": 0,
			"febrero": 0,
			"marzo": 0,
			"abril": 0,
			"mayo": 300000,
			"junio": 0,
			"julio": 0,
			"agosto": 0,
			"septiembre": 0,
			"octubre": 0,
			"noviembre": 0,
			"diciembre": 0
		  }
		],
		"subtotales": {
		  "enero": 1189600,
		  "febrero": 6103100,
		  "marzo": 1339600,
		  "abril": 1560100,
		  "mayo": 1497600,
		  "junio": 1290100,
		  "julio": 1217600,
		  "agosto": 1618600,
		  "septiembre": 1260100,
		  "octubre": 1247600,
		  "noviembre": 3817600,
		  "diciembre": 1460100
		},
		"imprevistos": {
		  "enero": 118960,
		  "febrero": 610310,
		  "marzo": 133960,
		  "abril": 156010,
		  "mayo": 149760,
		  "junio": 129010,
		  "julio": 121760,
		  "agosto": 161860,
		  "septiembre": 126010,
		  "octubre": 124760,
		  "noviembre": 381760,
		  "diciembre": 146010
		},
		"totales": {
		  "enero": 1308560,
		  "febrero": 6713410,
		  "marzo": 1473560,
		  "abril": 1716110,
		  "mayo": 1647360,
		  "junio": 1419110,
		  "julio": 1339360,
		  "agosto": 1780460,
		  "septiembre": 1386110,
		  "octubre": 1372360,
		  "noviembre": 4199360,
		  "diciembre": 1606110
		}
	  }
	};
  
	// Constantes para la tabla
	const conceptos = presupuestoData.presupuesto.conceptos;
	const subtotales = presupuestoData.presupuesto.subtotales;
	const imprevistos = presupuestoData.presupuesto.imprevistos;
	const totales = presupuestoData.presupuesto.totales;
	const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
	
	// Estado para el filtro de visualización
	let filtroMes = 'todos';
	let filtroCategorias = [];
	let busqueda = '';
	
	// Formateo de números a formato de moneda colombiana
	function formatoMoneda(valor) {
	  return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0
	  }).format(valor);
	}
	
	// Filtrar conceptos según búsqueda
	$: conceptosFiltrados = conceptos.filter(item => {
	  // Filtro por texto de búsqueda
	  const coincideBusqueda = busqueda === '' || 
		item.concepto.toLowerCase().includes(busqueda.toLowerCase());
	  
	  // Filtro por categoría (si se implementa después)
	  const coincideCategoria = filtroCategorias.length === 0 || 
		filtroCategorias.some(cat => item.concepto.includes(cat));
	  
	  return coincideBusqueda && coincideCategoria;
	});
	
	// Calcular totales por mes de los conceptos filtrados
	$: totalesFiltrados = meses.reduce((acc, mes) => {
	  acc[mes] = conceptosFiltrados.reduce((sum, concepto) => sum + concepto[mes], 0);
	  return acc;
	}, {});
	
	// Determinar si se debe mostrar alguna columna
	$: mostrarColumnas = filtroMes === 'todos' 
	  ? meses 
	  : [filtroMes];
	  
	// Calcular total anual por concepto
	$: totalesPorConcepto = conceptosFiltrados.map(concepto => {
	  return meses.reduce((total, mes) => total + concepto[mes], 0);
	});
	
	// Calcular el total anual de todos los conceptos filtrados
	$: totalAnual = totalesPorConcepto.reduce((sum, total) => sum + total, 0);
	
	// Estado para manejo de responsive
	let windowWidth;
	let mobileView = false;
	
	// Detectar si estamos en vista móvil
	function handleResize() {
	  mobileView = windowWidth < 768;
	}
	
	onMount(() => {
	  windowWidth = window.innerWidth;
	  handleResize();
	  
	  window.addEventListener('resize', () => {
		windowWidth = window.innerWidth;
		handleResize();
	  });
	  
	  return () => {
		window.removeEventListener('resize', handleResize);
	  };
	});
  </script>
  
  <div class="presupuesto-container">
	<header>
	  <h1>{presupuestoData.edificio}</h1>
	  <h2>Presupuesto {presupuestoData.presupuesto.tipo} - {presupuestoData.presupuesto.año}</h2>
	</header>
	
	<div class="filtros">
	  <div class="search-container">
		<input 
		  type="text" 
		  placeholder="Buscar concepto..." 
		  bind:value={busqueda}
		/>
	  </div>
	  
	  <div class="mes-selector">
		<label for="mes-select">Ver por mes:</label>
		<select id="mes-select" bind:value={filtroMes}>
		  <option value="todos">Todos los meses</option>
		  {#each meses as mes, i}
			<option value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
		  {/each}
		</select>
	  </div>
	</div>
	
	{#if !mobileView}
	  <!-- Vista de escritorio: tabla completa horizontal -->
	  <div class="table-container">
		<table>
		  <thead>
			<tr>
			  <th class="concepto-column">Concepto</th>
			  {#if filtroMes === 'todos'}
				{#each meses as mes}
				  <th>{mes.charAt(0).toUpperCase() + mes.slice(1)}</th>
				{/each}
				<th>Total Anual</th>
			  {:else}
				<th>{filtroMes.charAt(0).toUpperCase() + filtroMes.slice(1)}</th>
			  {/if}
			</tr>
		  </thead>
		  <tbody>
			{#each conceptosFiltrados as concepto, i}
			  <tr>
				<td class="concepto-cell">{concepto.concepto}</td>
				{#if filtroMes === 'todos'}
				  {#each meses as mes}
					<td class={concepto[mes] === 0 ? 'zero-value' : ''}>
					  {formatoMoneda(concepto[mes])}
					</td>
				  {/each}
				  <td class="total-value">{formatoMoneda(totalesPorConcepto[i])}</td>
				{:else}
				  <td class={concepto[filtroMes] === 0 ? 'zero-value' : ''}>
					{formatoMoneda(concepto[filtroMes])}
				  </td>
				{/if}
			  </tr>
			{/each}
			<!-- Fila de subtotales -->
			<tr class="subtotal-row">
			  <td><strong>Subtotal</strong></td>
			  {#if filtroMes === 'todos'}
				{#each meses as mes}
				  <td><strong>{formatoMoneda(subtotales[mes])}</strong></td>
				{/each}
				<td class="total-value">
				  <strong>{formatoMoneda(Object.values(subtotales).reduce((a, b) => a + b, 0))}</strong>
				</td>
			  {:else}
				<td><strong>{formatoMoneda(subtotales[filtroMes])}</strong></td>
			  {/if}
			</tr>
			<!-- Fila de imprevistos -->
			<tr class="imprevistos-row">
			  <td><strong>Imprevistos (10%)</strong></td>
			  {#if filtroMes === 'todos'}
				{#each meses as mes}
				  <td><strong>{formatoMoneda(imprevistos[mes])}</strong></td>
				{/each}
				<td class="total-value">
				  <strong>{formatoMoneda(Object.values(imprevistos).reduce((a, b) => a + b, 0))}</strong>
				</td>
			  {:else}
				<td><strong>{formatoMoneda(imprevistos[filtroMes])}</strong></td>
			  {/if}
			</tr>
			<!-- Fila de totales -->
			<tr class="total-row">
			  <td><strong>TOTAL</strong></td>
			  {#if filtroMes === 'todos'}
				{#each meses as mes}
				  <td><strong>{formatoMoneda(totales[mes])}</strong></td>
				{/each}
				<td class="total-value">
				  <strong>{formatoMoneda(Object.values(totales).reduce((a, b) => a + b, 0))}</strong>
				</td>
			  {:else}
				<td><strong>{formatoMoneda(totales[filtroMes])}</strong></td>
			  {/if}
			</tr>
		  </tbody>
		</table>
	  </div>
	{:else}
	  <!-- Vista móvil: tabla optimizada vertical -->
	  <div class="mobile-table-container">
		{#if filtroMes === 'todos'}
		  <!-- Tabla compacta para vista móvil con todos los meses -->
		  <table class="mobile-table">
			<thead>
			  <tr>
				<th>Concepto</th>
				<th>Total Anual</th>
				<th>Detalles</th>
			  </tr>
			</thead>
			<tbody>
			  {#each conceptosFiltrados as concepto, i}
				{#if totalesPorConcepto[i] > 0}
				  <tr>
					<td class="concepto-cell">{concepto.concepto}</td>
					<td>{formatoMoneda(totalesPorConcepto[i])}</td>
					<td>
					  <details>
						<summary>Ver meses</summary>
						<div class="details-content">
						  {#each meses as mes}
							{#if concepto[mes] > 0}
							  <div class="mes-detail">
								<span>{mes.charAt(0).toUpperCase() + mes.slice(1)}:</span>
								<span>{formatoMoneda(concepto[mes])}</span>
							  </div>
							{/if}
						  {/each}
						</div>
					  </details>
					</td>
				  </tr>
				{/if}
			  {/each}
			  <!-- Filas de resumen -->
			  <tr class="subtotal-row">
				<td><strong>Subtotal</strong></td>
				<td><strong>{formatoMoneda(Object.values(subtotales).reduce((a, b) => a + b, 0))}</strong></td>
				<td></td>
			  </tr>
			  <tr class="imprevistos-row">
				<td><strong>Imprevistos</strong></td>
				<td><strong>{formatoMoneda(Object.values(imprevistos).reduce((a, b) => a + b, 0))}</strong></td>
				<td></td>
			  </tr>
			  <tr class="total-row">
				<td><strong>TOTAL</strong></td>
				<td><strong>{formatoMoneda(Object.values(totales).reduce((a, b) => a + b, 0))}</strong></td>
				<td></td>
			  </tr>
			</tbody>
		  </table>
		{:else}
		  <!-- Tabla para un mes específico en móvil -->
		  <table class="mobile-table single-month">
			<thead>
			  <tr>
				<th>Concepto</th>
				<th>{filtroMes.charAt(0).toUpperCase() + filtroMes.slice(1)}</th>
			  </tr>
			</thead>
			<tbody>
			  {#each conceptosFiltrados as concepto}
				{#if concepto[filtroMes] > 0}
				  <tr>
					<td class="concepto-cell">{concepto.concepto}</td>
					<td class={concepto[filtroMes] === 0 ? 'zero-value' : ''}>
					  {formatoMoneda(concepto[filtroMes])}
					</td>
				  </tr>
				{/if}
			  {/each}
			  <!-- Filas de resumen -->
			  <tr class="subtotal-row">
				<td><strong>Subtotal</strong></td>
				<td><strong>{formatoMoneda(subtotales[filtroMes])}</strong></td>
			  </tr>
			  <tr class="imprevistos-row">
				<td><strong>Imprevistos (10%)</strong></td>
				<td><strong>{formatoMoneda(imprevistos[filtroMes])}</strong></td>
			  </tr>
			  <tr class="total-row">
				<td><strong>TOTAL</strong></td>
				<td><strong>{formatoMoneda(totales[filtroMes])}</strong></td>
			  </tr>
			</tbody>
		  </table>
		{/if}
	  </div>
	{/if}
	
	<div class="resumen-anual">
	  <h3>Resumen Anual</h3>
	  <div class="chart-container">
		<!-- Aquí se puede implementar una gráfica para visualizar gastos por mes -->
		<div class="bar-chart">
		  {#each meses as mes, i}
			{@const altura = Math.max(10, (totales[mes] / Math.max(...Object.values(totales))) * 100)}
			<div class="bar-container">
			  <div 
				class="bar" 
				style="height: {altura}%;"
				title="{mes.charAt(0).toUpperCase() + mes.slice(1)}: {formatoMoneda(totales[mes])}"
			  ></div>
			  <div class="bar-label">{mes.substring(0, 3)}</div>
			</div>
		  {/each}
		</div>
	  </div>
	</div>
  </div>
  
  <style>
	.presupuesto-container {
	  font-family: Arial, sans-serif;
	  max-width: 100%;
	  margin: 0 auto;
	  padding: 1rem;
	}
	
	header {
	  text-align: center;
	  margin-bottom: 2rem;
	}
	
	h1 {
	  margin: 0;
	  font-size: 1.5rem;
	  color: #2c3e50;
	}
	
	h2 {
	  margin: 0.5rem 0 0;
	  font-size: 1.25rem;
	  color: #34495e;
	}
	
	h3 {
	  color: #2c3e50;
	  margin-top: 2rem;
	}
	
	.filtros {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 1rem;
	  margin-bottom: 1.5rem;
	  justify-content: space-between;
	}
	
	.search-container {
	  flex: 1;
	  min-width: 200px;
	}
	
	input {
	  width: 100%;
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
	
	.mes-selector {
	  display: flex;
	  align-items: center;
	  gap: 0.5rem;
	}
	
	select {
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
	
	.table-container {
	  overflow-x: auto;
	  max-width: 100%;
	  margin-bottom: 2rem;
	}
	
	table {
	  width: 100%;
	  border-collapse: collapse;
	  font-size: 0.9rem;
	}
	
	th, td {
	  border: 1px solid #ddd;
	  padding: 0.5rem;
	  text-align: right;
	}
	
	th {
	  background-color: #f8f9fa;
	  position: sticky;
	  top: 0;
	  z-index: 1;
	}
	
	.concepto-column, .concepto-cell {
	  text-align: left;
	  max-width: 300px;
	}
	
	.zero-value {
	  color: #aaa;
	}
	
	.total-value {
	  font-weight: bold;
	}
	
	.subtotal-row {
	  background-color: #f8f9fa;
	}
	
	.imprevistos-row {
	  background-color: #f1f1f1;
	}
	
	.total-row {
	  background-color: #e9e9e9;
	  font-weight: bold;
	}
	
	/* Vista móvil */
	.mobile-table-container {
	  margin-bottom: 2rem;
	}
	
	.mobile-table {
	  width: 100%;
	}
	
	.details-content {
	  padding: 0.5rem;
	  background-color: #f9f9f9;
	  border-radius: 4px;
	}
	
	.mes-detail {
	  display: flex;
	  justify-content: space-between;
	  padding: 0.25rem 0;
	  border-bottom: 1px solid #eee;
	}
	
	.mes-detail:last-child {
	  border-bottom: none;
	}
	
	/* Gráfica de barras para el resumen anual */
	.resumen-anual {
	  margin-top: 2rem;
	}
	
	.chart-container {
	  margin-top: 1rem;
	  height: 200px;
	}
	
	.bar-chart {
	  display: flex;
	  align-items: flex-end;
	  justify-content: space-between;
	  height: 100%;
	  gap: 4px;
	}
	
	.bar-container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  flex: 1;
	}
	
	.bar {
	  width: 100%;
	  background-color: #3498db;
	  border-radius: 4px 4px 0 0;
	  transition: height 0.3s ease;
	}
	
	.bar-label {
	  font-size: 0.7rem;
	  margin-top: 0.25rem;
	  text-align: center;
	}
	
	@media (max-width: 768px) {
	  .filtros {
		flex-direction: column;
	  }
	  
	  h1, h2 {
		font-size: 1.2rem;
	  }
	  
	  h3 {
		font-size: 1rem;
	  }
	  
	  .bar-label {
		font-size: 0.6rem;
		transform: rotate(-45deg);
		margin-top: 0.5rem;
	  }
	}
  </style>