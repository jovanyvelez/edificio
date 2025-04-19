<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	//import SuperDebug from 'sveltekit-superforms';

	let data: PageProps = $props();

	const { apartamentos, ingresos } = data.data;
	const { form } = superForm(data.data.form);

	//let selected = $state();
</script>

<h1>Opción de pagos</h1>

<main>
	<form method="POST">
		<input type="hidden" name="idTransaccion" value={ingresos[0].id} />

		<label for="apto">Apartamento</label>
		<select bind:value={$form.apartamento} id="apto" name="apartamento">
			<option disabled selected>Seleccione un apartamento</option>
			{#each apartamentos as apartamento (apartamento.id)}
				<option value={apartamento.id}>
					{apartamento.numero}
				</option>
			{/each}
		</select>

		<label for="monto">Valor del pago</label>
		<input type="number" bind:value={$form.monto} id="monto" name="monto" />

		<label for="fecha">Fecha del pago</label>
		<input
			type="date"
			bind:value={$form.fechaPago}
			name="fechaPago"
			class="input input-primary"
			id="fecha"
		/>

		<label for="comprobante">Referencia o # de comprobante</label>
		<input
			type="text"
			bind:value={$form.referencia}
			name="referencia"
			class="input input-primary"
			id="comprobante"
		/>

		<label for="notas">Referencia o # de comprobante</label>
		<textarea bind:value={$form.notas} id="notas" name="notas" class="textarea"></textarea>

		<button type="submit">Enviar</button>
	</form>
</main>

<!--SuperDebug data={$form} /-->

<style>
	@reference "tailwindcss";
	
	h1 {
	  @apply mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl md:mb-8;
	}
	
	main {
	  @apply mx-auto w-full  py-4 sm:px-6 sm:py-6 lg:px-8;
	}
	
	form {
	  @apply mx-auto w-[90%] max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md 
			 sm:w-full sm:rounded-xl sm:p-5 md:max-w-lg md:p-6;
	}
	
	label {
	  @apply mb-1 block text-base font-medium text-gray-700 sm:text-sm md:text-base;
	}
	
	input, select {
	  @apply w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm box-border transition-colors
			 sm:py-2.5 md:text-lg
			 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:ring-offset-0;
	}
	
	select {
	  @apply bg-white pr-8 cursor-pointer sm:pr-10;
	}
	
	input[type="date"] {
	  @apply appearance-none;
	}
	
	textarea {
	  @apply w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm box-border text-base min-h-[100px] resize-y text-gray-700
			 md:text-lg md:min-h-[120px]
			 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:ring-offset-0;
	}
	
	button {
	  @apply mt-6 w-full rounded-md bg-blue-600 py-2.5 px-4 text-white font-semibold text-base shadow-sm 
			 sm:mt-8 md:py-3 md:text-lg
			 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all
			 active:bg-blue-800 active:transform active:translate-y-px;
	}
	
	form > *:not(:first-child) {
	  @apply mt-4 sm:mt-5;
	}
  </style>