<script lang="ts">
	//import '../app.css';
	let { children } = $props();
</script>
<h1>Edificio Mirador de Altavista PH</h1>
{@render children()}

<style>
    @reference "tailwindcss";

    h1 {
        @apply flex sm:mx-1 justify-center text-center text-5xl mt-10 font-bold;
    }

</style>
