<script lang="ts">
	import Constructing from '$lib/icons/Constructing.svelte';
	let showModal = $state(false);
	let dialog: HTMLDialogElement;

	function toggleModal() {
		showModal = !showModal;
		if (showModal) {
			dialog.show();
		} else {
			dialog.close();
		}
	}

	$effect(() => {
		$inspect(showModal);
	});
</script>

<dialog id="my_modal_1" class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Hola!</h3>
		<div class="flex flex-row">
			<Constructing />
			<p class="py-4 text-center">Muy pronto estará disponible</p>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" onclick={() => toggleModal()}>Cerrar</button>
			</form>
		</div>
	</div>
</dialog>

<main>
	<div class="mx-4 my-8 grid grid-cols-1 gap-8 md:grid-cols-[30%_70%]">
		<!-- Panel lateral con enlaces -->
		<div
			class="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg"
		>
			<h2
				class="mb-6 border-b border-blue-200 pb-4 text-center text-xl font-semibold text-indigo-800"
			>
				A tener en cuenta
			</h2>
			<ul class="space-y-5">
				<li class="font-medium text-indigo-700">
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-5 w-5 text-indigo-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
							/>
						</svg>
						Presupuesto
					</div>
				</li>
				<ul class="mt-2 ml-7 space-y-3">
					<li>
						<a
							href="/presupuesto"
							class="btn btn-link text-blue-600 transition-colors duration-200 hover:text-indigo-700"
							><span
								class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 group-hover:bg-indigo-600"
							></span> Aprobado 2025
						</a>
					</li>
					<li>
						<a
							href="/pptoAcum"
							class="btn btn-link text-blue-600 transition-colors duration-200 hover:text-indigo-700"
							><span
								class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 group-hover:bg-indigo-600"
							></span> Aprobado vs Ejecutado
						</a>
					</li>
				</ul>
				<li class="mt-4 font-medium text-indigo-700">
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-5 w-5 text-indigo-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Resumen Movimientos Financieros
					</div>
				</li>
				<ul class="mt-2 ml-7 space-y-3">
					<li>
						<button
							class="btn btn-link text-blue-600 transition-colors duration-200 hover:text-indigo-700"
							onclick={() => toggleModal()}
							><span
								class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 group-hover:bg-indigo-600"
							></span> Enero 2025
						</button>
					</li>
					<li>
						<button
							class="btn btn-link text-blue-600 transition-colors duration-200 hover:text-indigo-700"
							onclick={() => toggleModal()}
							><span
								class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 group-hover:bg-indigo-600"
							></span> Febrero 2025
						</button>
					</li>
					<li>
						<button
							class="btn btn-link text-blue-600 transition-colors duration-200 hover:text-indigo-700"
							onclick={() => toggleModal()}
							><span
								class="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 group-hover:bg-indigo-600"
							></span> Parcial marzo 2025
						</button>
					</li>
				</ul>
			</ul>
		</div>

		<!-- Contenido principal -->
		<div class="rounded-xl border border-gray-100 bg-white p-8 shadow-lg md:mr-10">
			<h1 class="mb-4 text-2xl font-bold text-red-600 md:text-3xl">
				COMUNICADO A LOS PROPIETARIOS – URGENTE: SISTEMA DE PRESIÓN DE AGUA DEL EDIFICIO
			</h1>
			<div class="px-2 md:px-6">
				<div class="container mx-auto p-4 text-sm md:p-8 md:text-xl">
					<article class="rounded-lg bg-white p-1 shadow-md md:p-10">
						<p class="mb-4 text-gray-700">
							<strong>Marzo 11 de 2025</strong>
						</p>
						<p class="mb-4 text-gray-700">
							<strong>Estimados Propietarios:</strong>
						</p>

						<p class="mb-4 text-gray-700">
							Nos dirigimos a ustedes con la mayor transparencia y preocupación para informarles
							sobre el estado actual de nuestro sistema de presión de agua y las acciones urgentes
							que hemos tenido que tomar.
						</p>

						<p class="mb-4 text-gray-700">
							Como saben, teníamos programado un mantenimiento preventivo de la motobomba, con un
							presupuesto inicial de $500.000. Sin embargo, al iniciar los trabajos, nos encontramos
							con una situación mucho más compleja de lo previsto. Debido a la antigüedad del
							sistema (más de 13 años en funcionamiento), la motobomba presentaba un deterioro
							significativo que requirió reparaciones mayores, incluyendo:
						</p>

						<ul class="mb-4 ml-6 list-inside list-disc text-gray-700">
							<li>Reemplazo de rodamientos, capacitores y platinos.</li>
							<li>Cambio de la carcasa de la bomba.</li>
							<li>Trabajos de maquinado en taller especializado.</li>
						</ul>

						<p class="mb-4 text-gray-700">
							Estas reparaciones fueron esenciales, para garantizar el correcto funcionamiento de la
							bomba e implicaron un costo de 3.5 veces el presupuesto inicial ($1.711.726).
						</p>
						<p class="mb-4 text-gray-700">
							Adicionalmente, detectamos fallas en el presóstato, el cual tuvo que ser reemplazado.
							Tras una revisión exhaustiva, confirmamos que el tanque de presión de agua presenta
							daños irreparables en su membrana. Lamentablemente, este componente y sus repuestos
							están descontinuados, lo que nos obliga a reemplazar el tanque completo para
							restablecer la operatividad del sistema.
						</p>

						<h2 class="mt-6 mb-4 text-xl font-semibold text-red-500 md:text-2xl">
							Situación Actual y Opciones:
						</h2>

						<p class="mb-4 text-gray-700">
							La adquisición e instalación del nuevo tanque hidroneumático tienen un costo de
							$2.106.000. Esta situación nos coloca ante dos escenarios posibles:
						</p>

						<ol class="mb-4 ml-6 list-inside list-decimal text-gray-700">
							<li>
								<span class="font-semibold">Recaudación de Fondos Extraordinaria:</span> Implementar
								una cuota extraordinaria para cubrir el costo del nuevo tanque. Esto nos permitiría restablecer
								el servicio de agua a presión adecuada en el menor tiempo posible, evitando mayores inconvenientes.
							</li>
							<li>
								<span class="font-semibold">Suspensión Temporal del Proyecto:</span> Aplazar la compra
								del nuevo tanque hasta que se puedan reunir los fondos necesarios a través de las cuotas
								ordinarias. Esta opción, aunque permitiría evitar una cuota extraordinaria inmediata,
								prolongaría la situación actual de baja presión de agua en los apartamentos y podría
								afectar la ejecución de otras tareas de mantenimiento programadas para este año.
							</li>
						</ol>

						<h2 class="mt-6 mb-4 text-xl font-semibold text-red-500 md:text-2xl">
							Entendemos y Compartimos la Preocupación:
						</h2>

						<p class="mb-4 text-gray-700">
							Somos plenamente conscientes del impacto que esta situación genera, tanto en términos
							económicos como en la comodidad de cada uno de ustedes. La falta de presión de agua
							adecuada es una molestia considerable, y la necesidad de una cuota extraordinaria o la
							postergación de otras tareas son decisiones difíciles.
						</p>
						<p class="mb-4 text-gray-700">
							Queremos asegurarles que hemos agotado todas las instancias posibles para minimizar
							los costos y buscar alternativas. Sin embargo, la situación actual del sistema, su
							antigüedad y la falta de repuestos nos obligan a tomar medidas urgentes para
							garantizar un servicio esencial como lo es el suministro de agua.
						</p>

						<h2 class="mt-6 mb-4 text-xl font-semibold text-red-500 md:text-2xl">
							Próximos Pasos:
						</h2>

						<p class="mb-4 text-gray-700">
							Convocaremos a una asamblea extraordinaria a la brevedad (indicar fecha y hora
							tentativa) para discutir en detalle esta situación, analizar las opciones y tomar una
							decisión conjunta. Es fundamental contar con su participación y comprensión para
							encontrar la mejor solución posible.
						</p>

						<p class="mb-4 text-gray-700">Agradecemos de antemano su comprensión y colaboración.</p>

						<p class="mt-6 text-gray-700">
							<strong>Atentamente,</strong>
						</p>
						<p class="text-gray-700">
							La Administración/El Consejo de Administración<br />
							Edificio Mirador de Altavita PH
						</p>
					</article>
				</div>
			</div>
		</div>
	</div>
</main>
