import { persisted } from 'svelte-persisted-store';
import { getSkin, blobToBase64 , convertAlexSkin } from './utilities';
import { get } from 'svelte/store';

const defaultStatue : Statue[] = [];

const statues = persisted('statues', defaultStatue);

const newStatue = (username : string, skinData : string | null) : Statue => {
	return {
		username,
		skin: skinData,
		parts: {
			headTopLeftBack : null,
			headBottomLeftBack : null,
			headTopRightBack : null,
			headBottomRightBack : null,
			headTopLeftFront : null,
			headBottomLeftFront : null,
			headTopRightFront : null,
			headBottomRightFront : null,
			armRightTop : null,
			armRightMiddle : null,
			armRightBottom : null,
			armLeftTop : null,
			armLeftMiddle : null,
			armLeftBottom : null,
			legRightTop : null,
			legRightMiddle : null,
			legRightBottom : null,
			legLeftTop : null,
			legLeftMiddle : null,
			legLeftBottom : null,
			chestTopRight : null,
			chestMiddleRight : null,
			chestBottomRight : null,
			chestTopLeft : null,
			chestMiddleLeft : null,
			chestBottomLeft : null,
		}
	}	
}

const addByUsername = async (username : string) => {
	let skin = await getSkin(username);
	let statue = newStatue(username, null);
	statues.update(statues => [...statues, statue]);

}

const addBySkin = async (name : string,skinData : Blob) => {
	let skinImage = await convertAlexSkin(skinData);
	let statue = newStatue(name, await blobToBase64(skinImage));
	statues.update(statues => [...statues, statue]);
}

const downloadSkinTexture = async (statue : Statue) : Promise<void> => {
	return new Promise(async (res, rej) => {  
		let skinBlob = await getSkin(statue.username);
		statue.skin = await blobToBase64(skinBlob);
		return res();
	});
}

const getNextPartForProcessing = async () : Promise<null | {statue:Statue,part:string,index:number}>=> {
	return new Promise(async (res, rej) => {
		let all_statues = get(statues);
		
		//check all skins missing textures
		let skins_missing_textures = all_statues.filter(statue => statue.skin == null);
		for (let skin of skins_missing_textures) await downloadSkinTexture(skin);

		//check all skins missing parts
		for (let statue of all_statues) {
			let index = 0;
			let parts = Object.entries(statue.parts);
			for (let [key, value] of parts) {
				if (!value) return res({statue:statue, part: key, index: index});
			}
		}
		return res(null);
	});
}

export {
	statues,
	addByUsername,
	addBySkin,
	getNextPartForProcessing
}
