<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	//import SuperDebug from 'sveltekit-superforms';

	let data: PageProps = $props();

	const { apartamentos, ingresos } = data.data;
	const { form } = superForm(data.data.form);

	//let selected = $state();

</script>

<h1 class="text-center text-2xl font-bold mb-15">Opción de pagos</h1>

<main class="mx-5  flex flex-col items-center">

	<form method="POST" class="mx-1 md:mx-20 flex flex-col rounded-lg border p-5 w-full lg:w-1/3">

		<input type="hidden" name="idTransaccion" value={ingresos[0].id} />

		<label for="apto" class="label mx-2">Apartamento</label>
		<select bind:value={$form.apartamento} id="apto" class="select" name="apartamento">
			<option disabled selected>Seleccione un apartamento</option>
			{#each apartamentos as apartamento (apartamento.id)}
				<option value={apartamento.id}>
					{apartamento.numero}
				</option>
			{/each}
		</select>

		<label for="monto" class="label mx-2 mt-2">Valor del pago</label>
		<input type="number" bind:value={$form.monto} class="input input-primary" id="monto" name="monto"  />

		<label for="fecha" class="label mx-2 mt-2">Fecha del pago</label>
		<input type="date" bind:value={$form.fechaPago} name="fechaPago" class="input input-primary" id="fecha" />

		<label for="comprobante" class="label mx-2 mt-2">Referencia o # de comprobante</label>
		<input type="text" bind:value={$form.referencia} name="referencia" class="input input-primary" id="comprobante" />

		<label for="notas" class="label mx-2 mt-2">Referencia o # de comprobante</label>
		<textarea bind:value={$form.notas} id="notas" name="notas" class="textarea"></textarea>

		<button type="submit" class="btn btn-primary my-2">Enviar</button>
	</form>

</main>

<!--SuperDebug data={$form} /-->
