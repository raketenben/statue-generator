<script lang="ts">
	import { IconX } from "@tabler/icons-svelte";
	import { statues } from "./statueStore";
	import { determineProcessing, determineProgress, validateFunctionName } from "./utilities";
	import { ProgressRadial, clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	
	export let statue : Statue;

	function removeStatue(statue: Statue) {
		statues.update((statues) => {
			return statues.filter((s) => s !== statue);
		});
	}

	$: progress = determineProgress(statue);
	$: valid = validateFunctionName(statue.username);

</script>
<tr>
	<td class="!p-2">
		<input
			type="text"
			class="inline-block bg-transparent h-full w-full text-lg px-3 rounded-token {valid ? '' : 'input-error'}"
			bind:value={statue.username}
			required
			title="{valid ? 'name of the function that will be used to summon the statue' : 'function names can only contain letters, numbers, and underscores'}"
		/>
	</td>
	<td>
		<div class="flex flex-row items-center">
			<span class="text-md px-2">/function statue:summon/{statue.username}</span>
			<button
				class="bg-primary-500 chip variant-soft hover:variant-filled px-2 p-1"
				use:clipboard={'/function statue:summon/' + statue.username}>Copy</button
			>
		</div>
	</td>
	<td>
		<div class="flex flex-row items-center">
			{#if determineProcessing(statue)}
				<ProgressRadial width="w-12" value={progress} font={130}>
					{progress}%
				</ProgressRadial>
			{:else}
				<span class="text-success">Finished</span>
			{/if}
		</div>
	</td>
	<td class="flex flex-col items-center justify-center !p-2">
		<button
			type="button"
			class="btn-icon btn-icon-sm variant-filled-error"
			on:click={() => removeStatue(statue)}><IconX></IconX></button
		>
	</td>
</tr>