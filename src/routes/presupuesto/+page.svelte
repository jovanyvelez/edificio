<script lang="ts">
	//import datos from '$lib/resources/Datatest';
	import { onMount } from 'svelte';

  export let data;

  const {datos} = data;

	// Definición de tipos
	interface DatoTabla {
	  item_nombre: string;
	  mes: number;
	  valor: number;
	}
	

	interface ItemValores {
	  [key: string]: (number | null)[];
	}
	


	// Nombres de los meses para los encabezados
	const meses: string[] = [
	  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
	  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	];
	
	// Versiones abreviadas de los meses para pantallas pequeñas
	const mesesAbreviados: string[] = [
	  "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
	  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
	];

	// Estado para controlar la visualización móvil
	let pantallaPequena = false;
	let mesFiltrado: number | null = null;
	
	// Comprobar el tamaño de la pantalla al cargar y en cambios de tamaño
	onMount(() => {
		const verificarAnchoPantalla = () => {
			pantallaPequena = window.innerWidth < 768;
		};
		
		verificarAnchoPantalla();
		window.addEventListener('resize', verificarAnchoPantalla);
		
		return () => {
			window.removeEventListener('resize', verificarAnchoPantalla);
		};
	});

	// Cambiar el mes seleccionado en vista móvil
	function seleccionarMes(index: number) {
		mesFiltrado = mesFiltrado === index ? null : index;
	}
	
	// Función para generar una clave única para cada combinación de item y mes
	function generarClave(item: string, mes: number): string {
	  return `${item}___${mes}`;
	}
	
	// Procesar los datos utilizando Map
	function procesarDatos(): ItemValores {
	  // Crear un nuevo Map para almacenar los items únicos
	  const nuevoMap = new Map<string, number>();
	  
	  // Conjunto para almacenar todos los nombres de items únicos
	  const itemsUnicos = new Set<string>();
	  
	  // Procesar cada entrada de datos
	  datos.forEach((entry: DatoTabla) => {
		const { item_nombre, mes, valor } = entry;
		
		// Validación: asegurarse de que el mes está entre 1 y 12
		if (mes < 1 || mes > 12) {
		  console.warn(`Mes inválido ignorado: ${mes} para el item ${item_nombre}`);
		  return;
		}
		
		// Registrar el nombre del item en nuestro conjunto de items únicos
		itemsUnicos.add(item_nombre);
		
		// Guardar el valor usando una clave única para la combinación de item y mes
		nuevoMap.set(generarClave(item_nombre, mes), valor);
	  });
	  
	  // Convertir los datos a la estructura final para mostrar en la tabla
	  const resultado: ItemValores = {};
	  
	  // Para cada item único, crear un array de 12 valores (uno para cada mes)
	  itemsUnicos.forEach(item => {
		resultado[item] = Array(12).fill(null);
		
		// Llenar los valores de cada mes que existan en nuestro Map
		for (let i = 1; i <= 12; i++) {
		  const clave = generarClave(item, i);
		  if (nuevoMap.has(clave)) {
			resultado[item][i-1] = nuevoMap.get(clave) || null;
		  }
		}
	  });
	  
	  return resultado;
	}
	
	// Ejecutar el procesamiento de datos de forma reactiva
	$: items = procesarDatos();
	
	// Calcular el total por item
	function calcularTotalItem(valores: (number | null)[]): number {
	  return valores.reduce((suma: number, valor: number | null) => suma + (valor || 0), 0);
	}
	
	// Calcular el total por mes
	function calcularTotalMes(mesIndex: number): number {
	  let total: number = 0;
	  Object.values(items).forEach((valores: (number | null)[]) => {
		if (valores[mesIndex] !== null) {
		  total += valores[mesIndex] || 0;
		}
	  });
	  return total;
	}
	
	// Formatear números como moneda
	function formatearMoneda(valor: number | null): string {
	  if (valor === null) return "";
	  return new Intl.NumberFormat('es-CO', { 
		style: 'currency', 
		currency: 'COP',
		minimumFractionDigits: 0
	  }).format(valor);
	}
</script>


<h1 class="flex justify-center md: text-3xl font-bold">Presupuesto 2025</h1>

<!-- Selector de meses para vista móvil -->
{#if pantallaPequena}
<div class="w-full mb-4">
  <div class="px-4 py-2 bg-gray-100 rounded-lg">
    <label class="block text-sm font-medium text-gray-700 mb-2">Seleccionar mes:</label>
    <div class="flex flex-wrap gap-2">
      {#each mesesAbreviados as mes, i}
        <button 
          class="px-3 py-1 text-sm rounded-md {mesFiltrado === i ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
          on:click={() => seleccionarMes(i)}
        >
          {mes}
        </button>
      {/each}
      {#if mesFiltrado !== null}
        <button 
          class="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
          on:click={() => mesFiltrado = null}
        >
          Mostrar todos
        </button>
      {/if}
    </div>
  </div>
</div>
{/if}

<!-- Vista para móvil (vertical) -->
{#if pantallaPequena}
  <div class="w-full overflow-hidden">
    {#each Object.entries(items) as [item, valores]}
      <div class="mb-4 bg-white rounded-lg shadow">
        <div class="px-4 py-3 bg-gray-50 font-medium border-b flex justify-between items-center">
          <span class="truncate flex-grow">{item}</span>
          <span class="text-right font-bold">{formatearMoneda(calcularTotalItem(valores))}</span>
        </div>
        {#if mesFiltrado === null}
          {#each valores as valor, i}
            {#if valor !== null}
              <div class="px-4 py-2 border-b flex justify-between items-center">
                <span class="text-gray-600">{meses[i]}</span>
                <span class="text-right">{formatearMoneda(valor)}</span>
              </div>
            {/if}
          {/each}
        {:else}
          <div class="px-4 py-2 border-b flex justify-between items-center">
            <span class="text-gray-600">{meses[mesFiltrado]}</span>
            <span class="text-right">{formatearMoneda(valores[mesFiltrado])}</span>
          </div>
        {/if}
      </div>
    {/each}
    <div class="mb-4 bg-blue-50 rounded-lg shadow">
      <div class="px-4 py-3 bg-blue-100 font-bold border-b flex justify-between items-center">
        <span>Total</span>
        <span class="text-right">
          {formatearMoneda(
            Object.values(items).reduce(
              (total: number, valores: (number | null)[]) => total + calcularTotalItem(valores), 0
            )
          )}
        </span>
      </div>
      {#if mesFiltrado === null}
        {#each Array(12).fill(0) as _, i}
          <div class="px-4 py-2 border-b flex justify-between items-center">
            <span class="text-gray-600">{meses[i]}</span>
            <span class="text-right font-medium">{formatearMoneda(calcularTotalMes(i))}</span>
          </div>
        {/each}
      {:else}
        <div class="px-4 py-2 border-b flex justify-between items-center">
          <span class="text-gray-600">{meses[mesFiltrado]}</span>
          <span class="text-right font-medium">{formatearMoneda(calcularTotalMes(mesFiltrado))}</span>
        </div>
      {/if}
    </div>
  </div>

<!-- Vista para desktop (tabla completa) -->
{:else}
  <div class="w-full overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="sticky left-0 bg-gray-100 px-4 py-2 text-left font-medium text-gray-700 border">Item</th>
          {#each meses as mes}
            <th class="px-4 py-2 text-center font-medium text-gray-700 border">{mes}</th>
          {/each}
          <th class="px-4 py-2 text-center font-medium text-gray-700 border">Total</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.entries(items) as [item, valores]}
          <tr class="hover:bg-gray-50">
            <td class="sticky left-0 bg-white border px-4 py-2 font-medium">{item}</td>
            {#each valores as valor, i}
              <td class="border px-4 py-2 text-right">{formatearMoneda(valor)}</td>
            {/each}
            <td class="border px-4 py-2 text-right font-bold bg-gray-50">{formatearMoneda(calcularTotalItem(valores))}</td>
          </tr>
        {/each}
        <tr class="bg-blue-50">
          <td class="sticky left-0 bg-blue-50 border px-4 py-2 font-bold">Total</td>
          {#each Array(12).fill(0) as _, i}
            <td class="border px-4 py-2 text-right font-bold">{formatearMoneda(calcularTotalMes(i))}</td>
          {/each}
          <td class="border px-4 py-2 text-right font-bold bg-blue-100">
            {formatearMoneda(
              Object.values(items).reduce(
                (total: number, valores: (number | null)[]) => total + calcularTotalItem(valores), 0
              )
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
{/if}

<!-- Versión para impresión (siempre visible pero oculta en pantalla) -->
<div class="hidden print:block w-full mt-8">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="border p-2 text-left bg-gray-100">Item</th>
        {#each meses as mes}
          <th class="border p-2 text-center bg-gray-100">{mes}</th>
        {/each}
        <th class="border p-2 text-center bg-gray-100">Total</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(items) as [item, valores]}
        <tr>
          <td class="border p-2">{item}</td>
          {#each valores as valor, i}
            <td class="border p-2 text-right">{formatearMoneda(valor)}</td>
          {/each}
          <td class="border p-2 text-right font-bold">{formatearMoneda(calcularTotalItem(valores))}</td>
        </tr>
      {/each}
      <tr>
        <td class="border p-2 font-bold">Total</td>
        {#each Array(12).fill(0) as _, i}
          <td class="border p-2 text-right font-bold">{formatearMoneda(calcularTotalMes(i))}</td>
        {/each}
        <td class="border p-2 text-right font-bold">
          {formatearMoneda(
            Object.values(items).reduce(
              (total: number, valores: (number | null)[]) => total + calcularTotalItem(valores), 0
            )
          )}
        </td>
      </tr>
    </tbody>
  </table>
</div>