<script>
	import DatpackExporter from "$lib/DatpackExporter.svelte";
	import StatueCommands from "$lib/StatueCommands.svelte";
	import SkinSelector from "$lib/SkinSelector.svelte";
	import TutorialPanel from "$lib/TutorialPanel.svelte";
</script>
<header class="bg-surface-700 p-4">
	<h1 class="h1 text-primary-500 font-bold">Statue generator</h1>
	<h2 class="h3 text-primary-500">Create posable player-statues for Minecraft</h2>
</header>
<main class="columns-xl gap-5 p-5">
	<SkinSelector />
	<DatpackExporter />
	<StatueCommands />
	<TutorialPanel />
</main>
<!-- class="grid grid-auto-cols md:grid-cols-3 gap-5 p-5" -->
