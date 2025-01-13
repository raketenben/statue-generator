import JSZip from "jszip";
import {statues} from "./statueStore";
import { convertUUID, createUUIDString, sanatizeName } from "./utilities";
import { get } from "svelte/store";
import versions from "./datapackVersions";

const statues_right_handed = {
    headTopLeftBack: true,
    headBottomLeftBack : true,
    headTopRightBack : false,
    headBottomRightBack : false,
    headTopLeftFront : true,
    headBottomLeftFront : true,
    headTopRightFront : false,
    headBottomRightFront : false,
    armRightTop : false,
    armRightMiddle : false,
    armRightBottom : false,
    armLeftTop : true,
    armLeftMiddle : true,
    armLeftBottom : true,
    legRightTop : false,
    legRightMiddle : false,
    legRightBottom : false,
    legLeftTop : true,
    legLeftMiddle : true,
    legLeftBottom : true,
    chestTopRight : false,
    chestMiddleRight : false,
    chestBottomRight : false,
    chestTopLeft : true,
    chestMiddleLeft : true,
    chestBottomLeft : true
};

const statue_tags = {
    headTopLeftBack: ["head", "head-left", "head-top-left-back"],
    headBottomLeftBack : ["head", "head-left", "head-bottom-left-back"],
    headTopRightBack : ["head", "head-right", "head-top-right-back"],
    headBottomRightBack : ["head", "head-right", "head-bottom-right-back"],
    headTopLeftFront : ["head", "head-left", "head-top-left-front"],
    headBottomLeftFront : ["head", "head-left", "head-bottom-left-front"],
    headTopRightFront : ["head", "head-right", "head-top-right-front"],
    headBottomRightFront : ["head", "head-right", "head-bottom-right-front"],
    armRightTop : ["arm-right", "arm-right-1"],
    armRightMiddle : ["arm-right", "arm-right-2"],
    armRightBottom : ["arm-right", "arm-right-3"],
    armLeftTop : ["arm-left", "arm-left-1"],
    armLeftMiddle : ["arm-left", "arm-left-2"],
    armLeftBottom : ["arm-left", "arm-left-3"],
    legRightTop : ["leg-right", "leg-right-1"],
    legRightMiddle : ["leg-right", "leg-right-2"],
    legRightBottom : ["leg-right", "leg-right-3"],
    legLeftTop : ["leg-left", "leg-left-1"],
    legLeftMiddle : ["leg-left", "leg-left-2"],
    legLeftBottom : ["leg-left", "leg-left-3"],
    chestTopRight : ["chest", "chest-top-right"],
    chestMiddleRight : ["chest", "chest-middle-right"],
    chestBottomRight : ["chest", "chest-bottom-right"],
    chestTopLeft : ["chest", "chest-top-left"],
    chestMiddleLeft : ["chest", "chest-middle-left"],
    chestBottomLeft : ["chest", "chest-bottom-left"]
};

const helper_tags = [
    ["main", "live"],
    ["neck"],
    ["shoulder-right"],
    ["shoulder-left"],
    ["hip-right"],
    ["hip-left"]
]

const baseTags = ["statue"];

const getHeadOwnerNbt = (packFormat : number,skinData : SkinData) => {
	const texture = skinData.texture;
	const uuid = createUUIDString(convertUUID(skinData.uuid));
	const signature = texture.signature;
	const value = texture.value;
	if(packFormat >= 5 && packFormat <= 40) {
		return `,tag:{SkullOwner:{Id:${uuid},Properties:{textures:[{ Value:"${value}",Signature:"${signature}"}]}}}`;
	}else if(packFormat >= 41) {
		return `,components:{"minecraft:profile":{properties:[{name:"textures",value:"${value}",signature:"${signature}"}]}}`; //id:${uuid},
	}
	return "";
}

const getHandNbt = (packFormat : number, rightHanded : boolean,itemNbt : string) : string => {
	return ",HandItems:[" + ((rightHanded) ? `{Count:1b,id:"minecraft:player_head"${itemNbt}},{}` : `{},{Count:1b,id:"minecraft:player_head"${itemNbt}}`) + "]";
}

const generateSummonCommand = (packFormat : number, tags : string[],skinData : SkinData | null, rightHanded : boolean) => {
	const handNbt = (skinData) ? getHandNbt(packFormat,rightHanded,getHeadOwnerNbt(packFormat,skinData)) : "";
	const tagList = tags.concat(baseTags).join(`","`);
	const tagsNbt = `,Tags:["${tagList}"]`;
	const mainNbt = `summon minecraft:armor_stand ~ ~ ~ {Invulnerable:1b,DisabledSlots:2096896,Marker:1b,ShowArms:1b,NoGravity:1b,NoBasePlate:1b,Invisible:1b${tagsNbt}${handNbt}}`;
	return mainNbt;
}

const generateSummonFunction = (packFormat : number,statue : Statue): string  => {
	const commands = [];
	//up counter
	commands.push("scoreboard players add GLOBAL statue_id 1");
	//generate heads
	for(const [part, skinData] of Object.entries(statue.parts)){
		commands.push(generateSummonCommand(packFormat,statue_tags[part as StatuePartKey],skinData,statues_right_handed[part as StatuePartKey]));
	}
	//generate helper parts
	for(let i = 0; i < 6; i++){
		commands.push(generateSummonCommand(packFormat,helper_tags[i],null,false));
	}
	//set scoreboard for statue
	commands.push("execute as @e[tag=statue] unless score @s statue_id = @s statue_id run scoreboard players operation @s statue_id = GLOBAL statue_id");

	return commands.join("\n");
};

const loadDatapackTemplate = async () => {
    return fetch('./statue.zip')
        .then(function(response) {
            if (response.status === 200)
                return Promise.resolve(response.blob());
			return Promise.reject(response.statusText);
        })
        .then(JSZip.loadAsync)
        .then(function(zip) {
            return zip
        })
}

const createDatapack = async (packFormat : number) : Promise<Blob> => {
	return new Promise(async (res, rej) => {
		const datapack = await loadDatapackTemplate();

		const min_format = packFormat;
		const min_format_index = versions.findIndex(version => version.value == packFormat);
		let max_format = versions[min_format_index + 1]?.value;
		//assume it's gonna stay compatible with the next version
		if(!max_format) max_format = 1000;

		const mcmeta = JSON.stringify({
			pack: {
				pack_format:packFormat,
				supported_formats: [min_format,max_format],
				description:"StatuePack"
			},
		})
		datapack.file('pack.mcmeta',mcmeta)

		const all_statues = get(statues);
		for(const statue of all_statues){
			const summon_function = generateSummonFunction(packFormat,statue);
			const name = sanatizeName(statue.username);

			const filename = (packFormat >= 41) ? `data/statue/function/summon/${name}.mcfunction` : `data/statue/functions/summon/${name}.mcfunction`;

			datapack.file(filename, summon_function);
		}

		datapack.generateAsync({ type: "blob" }).then((blob) => {
			return res(blob);
		}, function(err) {
			return rej(err);
		});
	});
}

export {
	createDatapack
}