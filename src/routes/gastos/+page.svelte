<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	//import SuperDebug from 'sveltekit-superforms';

	let data: PageProps = $props();
	const { items } = data.data;
	const { form } = superForm(data.data.form);

	//let selected = $state();
</script>

<h1 class="mb-15 text-center text-2xl font-bold">Opción de Egresos</h1>

<main class="mx-5 flex flex-col items-center">
	<form method="POST" class="mx-1 flex w-full flex-col rounded-lg border p-5 md:mx-20 lg:w-1/3">
		<input type="hidden" value={$form.tipo} />
		<label for="item" class="label mx-2">Gasto</label>
		<select bind:value={$form.item} id="item" class="select" name="item">
			<option disabled selected>Seleccione una opcion del ppto</option>
			{#each items as item (item.id)}
				<option value={item.id}>
					{item.nombre}
				</option>
			{/each}
		</select>

		<label for="monto" class="label mx-2 mt-2">Valor del pago</label>
		<input
			type="number"
			bind:value={$form.monto}
			class="input input-primary"
			id="monto"
			name="monto"
		/>

		<label for="fecha" class="label mx-2 mt-2">Fecha del pago</label>
		<input
			type="date"
			bind:value={$form.fechaPago}
			name="fechaPago"
			class="input input-primary"
			id="fecha"
		/>

		<label for="comprobante" class="label mx-2 mt-2">Referencia o # de comprobante</label>
		<input
			type="text"
			bind:value={$form.referencia}
			name="referencia"
			class="input input-primary"
			id="comprobante"
		/>

		<label for="notas" class="label mx-2 mt-2">Observaciones</label>
		<textarea bind:value={$form.notas} id="notas" name="notas" class="textarea"></textarea>

		<button type="submit" class="btn btn-primary my-2">Enviar</button>
	</form>
</main>

<!--SuperDebug data={$form} /-->
