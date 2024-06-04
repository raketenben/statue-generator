<script lang="ts">
	import StatueRow from './StatueRow.svelte';

	import { IconDownload } from '@tabler/icons-svelte';
	import { IconX } from '@tabler/icons-svelte';

	import { ProgressBar, clipboard } from '@skeletonlabs/skeleton';

	import { statues } from '$lib/statueStore';
	import versions from './datapackVersions';

	import { ProgressRadial } from '@skeletonlabs/skeleton';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { createDatapack } from './datapackExporter';
	import { determineProcessing, download, validateFunctionName } from './utilities';
	import { get } from 'svelte/store';
	const modalStore = getModalStore();

	let pack_version = versions[versions.length - 1].value;

	let isProcessing = false;
	statues.subscribe((_statues) => {
		let allFinished = true;
		_statues.forEach((statue) => {
			if (determineProcessing(statue)) allFinished = false;
		});
		isProcessing = !allFinished;
	});

	let invalidNames = false;
	statues.subscribe((_statues) => {
		invalidNames = false;
		_statues.forEach((statue) => {
			if(!validateFunctionName(statue.username)) invalidNames = true;
		});
	});

	function downloadPackSubmit() {
		if (get(statues).length < 1) {
			modalStore.trigger({
				type: 'alert',
				title: 'No statues to download',
				body: 'You need to add at least one statue to the datapack before you can download it.',
			});
			return;
		}

		if (invalidNames) {
			modalStore.trigger({
				type: 'alert',
				title: 'Invalid function names',
				body: 'Some of the function names are invalid. Please make sure they only contain letters, numbers, and underscores.',
			});
			return;
		}

		if (isProcessing) {
			modalStore.trigger({
				type: 'confirm',
				title: 'Not all statues are finished',
				body: 'If you download the datapack now, some statues might be missing. Are you sure you want to continue?',
				response: (response) => {
					if (response) downloadPack();
				},
			});
			return;
		}else{
			downloadPack();
		}
	}

	async function downloadPack() {
		let datapack = await createDatapack(pack_version);
		download(datapack, 'statues.zip');
	}

</script>

<div class="flex flex-col mb-5 break-inside-avoid-column">
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name in Datapack</th>
					<th>Summon Command</th>
					<th>Status</th>
					<th class="text-center">Remove</th>
				</tr>
			</thead>
			<tbody>
				{#each $statues as statue}
					<StatueRow bind:statue={statue}/>
				{/each}
				{#if $statues.length < 1}
					<tr>
						<td colspan="4" class="text-center">No statues added yet</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	{#if isProcessing}
		<ProgressBar />
	{/if}
	<div class="flex flex-row justify-center">
		<select
			name="version"
			id="versions"
			class="rounded-token bg-surface-100 dark:bg-surface-500 p-3 m-2"
			bind:value={pack_version}
		>
			{#each versions as version}
				<option value={version.value}>{version.label}</option>
			{/each}
		</select>
		<button type="button" class="btn m-2 {isProcessing || invalidNames || get(statues).length < 1 ? "variant-filled" : "variant-filled-success"}" on:click={downloadPackSubmit}>
			<span><IconDownload /></span>
			<span>Download</span>
		</button>
	</div>
</div>
