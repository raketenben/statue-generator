<script lang="ts">
	import { FileDropzone } from "@skeletonlabs/skeleton";
	import { IconFileUpload } from '@tabler/icons-svelte';
	import { IconCirclePlus} from '@tabler/icons-svelte';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import { addBySkin, addByUsername } from '$lib/statueStore';
	import { sanatizeName } from "./utilities";
	
	const toastStore = getToastStore();

	let username = "";
	let files : FileList;

	function onChangeHandler(e: Event): void {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			let filename = sanatizeName(file.name.split(".")[0]);

			addBySkin(filename,file);
		}
	}

	function addUsername(){
		if(username.length < 1) toastStore.trigger({message: `Username can't be empty`});
		addByUsername(username);
		username = "";
	}
</script>

<div class="card p-4 flex flex-col items-center mb-5 break-inside-avoid-column">
	<span class="my-2 font-bold text-secondary-500 text-lg">Enter a Username</span>
	<div class="flex flex-row w-full items-center btn-group">
		<input class="input p-2 text-center text-md rounded-r-none" type="text" placeholder="Username" bind:value={username}>
		<button type="button" class="btn variant-filled-secondary rounded-l-none" on:click={() => addUsername()}>
			<span><IconCirclePlus /></span>
			<span>Add to Datapack</span>
		</button>
	</div>
	<span class="my-2 font-bold text-secondary-500">OR</span>
	<FileDropzone multiple name="files" slotLead="flex flex-col items-center" bind:files={files} on:change={onChangeHandler}>
		<svelte:fragment slot="lead">
			<IconFileUpload />
		</svelte:fragment>
		<svelte:fragment slot="message">Upload a Skin</svelte:fragment>
		<svelte:fragment slot="meta">PNG, JPG</svelte:fragment>
	</FileDropzone>
</div>