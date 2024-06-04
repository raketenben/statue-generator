<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import mcfunction from '$lib/mcfunction';
	hljs.registerLanguage('mcfunction', mcfunction);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	//Initialize Toast
	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';
	initializeStores();

	import Generator from '$lib/generator';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { statues } from '$lib/statueStore';
	if(browser) {
		let generator = new Generator();

		onMount(() => {
			generator.start();
		});

		statues.subscribe(value => {
			generator.start();
		});
	}
	
</script>

<svelte:head>
	<title>Statue Generator</title>
</svelte:head>
<Toast />
<Modal />
<slot />
