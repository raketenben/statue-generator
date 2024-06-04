import { get } from "svelte/store";
import { statues, getNextPartForProcessing } from "./statueStore";
import { base64ToImage, blobToBase64, canvasToBlob, uploadSkin } from "./utilities";

//backside -    ,dx:3,dy:1
//front -       ,dx:1,dy:1
//left -        ,dx:2,dy:1
//right -       ,dx:0,dy:1
//top -         ,dx:1,dy:0
//bottom -      ,dx:2,dy:0

const texture_mappings = {
    headTopLeftBack : [
        /* head backside*/
        { sx: 5, sy: 2, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 6, sy: 2, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 0, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headBottomLeftBack : [
        { sx: 5, sy: 3, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 6, sy: 3, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 5, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headTopRightBack : [
        { sx: 0, sy: 2, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 7, sy: 2, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 0, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headBottomRightBack : [
        { sx: 0, sy: 3, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 7, sy: 3, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 4, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headTopLeftFront : [
        /* head front*/
        { sx: 4, sy: 2, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 2, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 1, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headBottomLeftFront : [
        { sx: 4, sy: 3, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 3, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 5, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headTopRightFront : [
        { sx: 1, sy: 2, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 2, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 1, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    headBottomRightFront : [
        { sx: 1, sy: 3, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 3, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 4, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    armRightTop : [
        /* arm right*/
        { sx: 11, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    armRightMiddle : [
        { sx: 11, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    armRightBottom : [
        { sx: 11, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    armLeftTop : [
        /*fallback old skin*/
        { sx: 11, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /* arm left*/
        { sx: 9, sy: 12, dx: 1, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 12, dx: 2, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 8, sy: 13, dx: 0, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 9, sy: 13, dx: 1, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 13, dx: 2, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 11, sy: 13, dx: 3, dy: 1, rotation: 0, osx: 4, osy: 0 },
    ],
    armLeftMiddle : [
        /*fallback old skin*/
        { sx: 11, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /*normal*/
        { sx: 9, sy: 13, dx: 1, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 13, dx: 2, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 8, sy: 14, dx: 0, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 9, sy: 14, dx: 1, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 14, dx: 2, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 11, sy: 14, dx: 3, dy: 1, rotation: 0, osx: 4, osy: 0 },
    ],
    armLeftBottom : [
        /* fallback*/
        { sx: 11, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /*normal*/
        { sx: 9, sy: 14, dx: 1, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 12, dx: 2, dy: 0, rotation: 0, osx: 4, osy: 0 },
        { sx: 8, sy: 15, dx: 0, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 9, sy: 15, dx: 1, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 10, sy: 15, dx: 2, dy: 1, rotation: 0, osx: 4, osy: 0 },
        { sx: 11, sy: 15, dx: 3, dy: 1, rotation: 0, osx: 4, osy: 0 },
    ],
    legRightTop : [
        /* leg right*/
        { sx: 1, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    legRightMiddle : [
        { sx: 1, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    legRightBottom : [
        { sx: 1, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    legLeftTop : [
        /* fallback*/
        { sx: 1, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /* leg left*/
        { sx: 5, sy: 12, dx: 1, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 5, sy: 12, dx: 2, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 4, sy: 13, dx: 0, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 5, sy: 13, dx: 1, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 6, sy: 13, dx: 2, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 7, sy: 13, dx: 3, dy: 1, rotation: 0, osx: -4, osy: 0 },
    ],
    legLeftMiddle : [
        /* fallback*/
        { sx: 1, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /*normal*/
        { sx: 5, sy: 13, dx: 1, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 5, sy: 13, dx: 2, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 4, sy: 14, dx: 0, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 5, sy: 14, dx: 1, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 6, sy: 14, dx: 2, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 7, sy: 14, dx: 3, dy: 1, rotation: 0, osx: -4, osy: 0 },
    ],
    legLeftBottom : [
        /* fallback*/
        { sx: 1, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
        /*normal*/
        { sx: 5, sy: 14, dx: 1, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 6, sy: 12, dx: 2, dy: 0, rotation: 0, osx: -4, osy: 0 },
        { sx: 4, sy: 15, dx: 0, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 5, sy: 15, dx: 1, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 6, sy: 15, dx: 2, dy: 1, rotation: 0, osx: -4, osy: 0 },
        { sx: 7, sy: 15, dx: 3, dy: 1, rotation: 0, osx: -4, osy: 0 },
    ],
    chestTopRight : [
        /* body right*/
        { sx: 5, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 4, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    chestMiddleRight : [
        { sx: 4, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    chestBottomRight : [
        { sx: 7, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 4, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    chestTopLeft : [
        /* body left*/
        { sx: 6, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 6, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    chestMiddleLeft : [
        { sx: 6, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    chestBottomLeft : [
        { sx: 8, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 6, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ]
};


class Generator {

	canvas : HTMLCanvasElement;
	canvas1 : HTMLCanvasElement;
	ctx : CanvasRenderingContext2D;
	ctx1 : CanvasRenderingContext2D;
	running = false;
	timeout : ReturnType<typeof setTimeout>  | null = null;

	constructor() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = 64;
		this.canvas.height = 64;
		this.ctx = this.canvas.getContext("2d")!;
		this.ctx.imageSmoothingEnabled = false;

		this.canvas1 = document.createElement('canvas');
		this.canvas1.width = 64;
		this.canvas1.height = 64;
		this.ctx1 = this.canvas1.getContext("2d")!;
		this.ctx1.imageSmoothingEnabled = false;
	}

	start() {
		if (this.running) return;
		this.running = true;
		this.processNext();
	}
	
	mapTiles(dst : CanvasRenderingContext2D, src : HTMLCanvasElement, sx : number, sy: number, dx: number, dy: number, rotation: number) {
        let _tile = document.createElement('canvas');
        _tile.width = 8;
        _tile.height = 8;
        var _tilectx = _tile.getContext("2d");
		if (!_tilectx) return;
        _tilectx.imageSmoothingEnabled = false;
        _tilectx.drawImage(src, sx * 4, sy * 4, 4, 4, 0, 0, 8, 8);
        _tilectx.translate(4, 4);
        _tilectx.rotate((Math.PI / 2) * rotation);
        dst.drawImage(_tile, dx * 8, dy * 8, 8, 8);
    }

    doubleTiles(dst: CanvasRenderingContext2D, src : HTMLCanvasElement, sx : number, sy: number, dx: number, dy: number, rotation: number, osx: number, osy : number) {
        this.mapTiles(dst, src, sx, sy, dx, dy, rotation);
        this.mapTiles(dst, src, sx + osx, sy + osy, dx + 4, dy, rotation);
    }

	async createHead(skinImage : HTMLImageElement, part : string) : Promise<Blob> {
		this.ctx.clearRect(0, 0, 64, 64);
		this.ctx.drawImage(skinImage, 0, 0);
		this.ctx1.clearRect(0, 0, 64, 64);
		return new Promise(async (resolve, reject) => {
			let head_mapping = texture_mappings[part as StatuePartKey];

			for (let x = 0; x < head_mapping.length; x++) {
				const operation_mapping = head_mapping[x];
				this.doubleTiles(this.ctx1, this.canvas, operation_mapping.sx, operation_mapping.sy, operation_mapping.dx, operation_mapping.dy, operation_mapping.rotation, operation_mapping.osx, operation_mapping.osy);
			}

			return resolve(await canvasToBlob(this.canvas1));
		});
	}

	async processNext() {
		let next_part = await getNextPartForProcessing();
		if(!next_part) {
			this.running = false;
			return;
		}

		let skin = next_part.statue.skin!;
		let part = next_part.part;

		let head_skin_blob = await this.createHead(await base64ToImage(skin), part);

		uploadSkin(head_skin_blob).then(({data,waittime}) => {
			statues.update(statues => {
				for (let statue of statues) {
					if (statue.username == next_part.statue.username)
						statue.parts[part as StatuePartKey] = data as SkinData;
				}
				return statues;
			});
			this.timeout = setTimeout(() => {
				this.processNext();
			}, waittime);
		}).catch((err) => {
			console.log("Error uploading skin", err);
			this.timeout = setTimeout(() => {
				this.processNext();
			}, 3000);
		});
			
	}
}

export default Generator;