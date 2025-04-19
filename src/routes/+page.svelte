<script lang="ts">
	import Comunicado from './Carta.md';
</script>

<main>
	<div class="main_div">
		<!-- Panel lateral con enlaces -->
		<div class="main_aside">
			<h2 class="main_aside_title">Importante</h2>
			<ul class="main_ul_aside">
				<li class="main_li_title">
					<div class="main_icons">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="format_icons"
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
				<ul class="main_titles">
					<li>
						<a href="/presupuesto" class="main_li_subtitle"
							><span class="main_li_items"></span> Aprobado 2025
						</a>
					</li>
					<li>
						<a href="/pptoAcum" class="main_li_subtitle"
							><span class="main_li_items"></span> Aprobado vs Ejecutado
						</a>
					</li>
				</ul>
				<li class="main_li_title mt-4">
					<div class="main_icons">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="format_icons"
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
						Ingresos
					</div>
				</li>
				<ul class="main_titles">
					<li>
						<a href="/ingresos" class="main_li_subtitle"
							><span class="main_li_items"></span> Ingresos apartamentos
						</a>
					</li>
				</ul>
			</ul>
		</div>

		<!-- Contenido principal -->
		<div class="comunica">
			<Comunicado />
		</div>
	</div>
</main>

<style>
	/* Add your custom styles here */
	@reference "tailwindcss";

	ul {
		list-style-type: none;
		list-style-image: none;
		padding-left: 0;
	}
	a {
		text-decoration: none;
	}
	.main_div {
		@apply mx-4 my-8 grid grid-cols-1 gap-8 md:grid-cols-[30%_70%];
	}

	.main_aside {
		@apply rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg;
	}

	.main_aside_title {
		@apply mb-6 border-b border-blue-200 pb-4 text-center text-xl font-semibold text-indigo-800;
	}

	.main_ul_aside {
		@apply list-none list-image-none space-y-5;
	}

	.main_li_title {
		@apply font-medium text-indigo-700;
	}

	.main_li_subtitle {
		@apply list-none text-xl text-blue-600 transition-colors duration-200 hover:text-indigo-700;
	}

	.main_li_items {
		@apply mr-2 inline-block h-2 w-2 list-none rounded-full bg-blue-500 group-hover:bg-indigo-600;
	}

	.main_icons {
		@apply flex items-center;
	}

	.main_titles {
		@apply mt-2 ml-7 space-y-3;
	}

	.comunica {
		@apply rounded-xl border border-gray-100 bg-white p-8 shadow-lg md:mr-10;
	}

	.format_icons {
		@apply mr-2 h-5 w-5 text-indigo-500;
	}
</style>
