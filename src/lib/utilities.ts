import { getToastStore } from '@skeletonlabs/skeleton';

function createUUIDString(uuid : number[]) : string {
    return `[I;${uuid[0]},${uuid[1]},${uuid[2]},${uuid[3]}]`;
}

function convertUUID(uuid : string) : number[] {
    uuid = uuid.replaceAll("-", "")

    var uuidIntArray = new Array();
    for (let i = 0; i < 4; i++) {
        const element = uuid.substr(i * 8, 8);
        const n = hexToInt(element)
        uuidIntArray.push(n);
    }
    return uuidIntArray;
}

function hexToInt(hex : string) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
}

function convertAlexSkin(blob : Blob) : Promise<Blob> {
    return new Promise((res, rej) => {
        let _canvas = document.createElement('canvas');
        _canvas.width = 64;
        _canvas.height = 64;
        let _ctx = _canvas.getContext("2d");
		if (!_ctx) return rej();
        _ctx.imageSmoothingEnabled = false;
        let _img = new Image();
        _img.src = URL.createObjectURL(blob);
        _img.onload = async() => {
            _ctx.clearRect(0, 0, 64, 64);
            _ctx.drawImage(_img, 0, 0);

            let isAlex = _ctx.getImageData(54, 20, 1, 1).data[3] < 1;
            if (isAlex) {
                //lower layer
                _ctx.drawImage(_canvas, 44, 16, 20, 32, 45, 16, 20, 32);
                _ctx.drawImage(_canvas, 48, 16, 20, 32, 49, 16, 20, 32);

                //top layer
                _ctx.drawImage(_canvas, 36, 48, 28, 16, 37, 48, 28, 16);
                _ctx.drawImage(_canvas, 40, 48, 28, 16, 41, 48, 28, 16);

                _ctx.drawImage(_canvas, 52, 48, 28, 16, 53, 48, 28, 16);
                _ctx.drawImage(_canvas, 56, 48, 28, 16, 57, 48, 28, 16);
            }
			
            let _imageBlob = await canvasToBlob(_canvas);
            res(_imageBlob);
        }
    });
}

function getSkin(_playername : string) : Promise<Blob>{
    return new Promise((res, rej) => {
        fetch(`https://minotar.net/skin/${_playername}`).then((res) => res.blob()).then(convertAlexSkin).then((_blob) => {
            res(_blob);
        }).catch(() => {
            rej();
        })
    });
}

function uploadSkin(blob : Blob) : Promise<{data:SkinData,waittime:number}>{
	return new Promise((res, rej) => {
		var formData = new FormData();
		formData.append('file', blob);
		fetch("https://api.mineskin.org/generate/upload", {
			method: 'POST',
			body: formData
		}).then((res) => res.json()).then((json) => {
			let waittime = json.delayInfo.millis < 50 ? 3000 : json.delayInfo.millis;
			return res({data:json.data, waittime: waittime})
		}, rej).catch(() => {
			rej();
		});
	});
}

function canvasToBlob(canvas : HTMLCanvasElement) : Promise<Blob> {
	return new Promise((res, _) => {
		canvas.toBlob((blob) => {
			if (blob) res(blob);
		});
	});
}

function blobToBase64(blob : Blob) : Promise<string> {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		}
		reader.readAsDataURL(blob);
	});
}

function base64ToImage(base64 : string) : Promise<HTMLImageElement> {
	return new Promise((resolve, _) => {
		const img = new Image();
		img.src = base64;
		img.onload = () => {
			resolve(img);
		}
	});
}

const functionRegex = /^[A-Za-z0-9/._-]{1,32}$/;
function validateFunctionName(name : string) {
	return functionRegex.test(name);
}

function sanatizeName(name : string) {
    return name.toLowerCase().replace(/[^a-z0-9/._-]/g, "");
}

function download(blob : Blob, filename : string) {
    var a = document.createElement("a");
    a.classList.add("download");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function determineProcessing(statue: Statue): boolean {
	let statueParts = Object.entries(statue.parts);
	let totalParts = statueParts.length;
	let finishedParts = statueParts.filter((part) => part[1] !== null);

	return finishedParts.length < totalParts;
}

function determineProgress(statue: Statue): number {
	let statueParts = Object.entries(statue.parts);
	let totalParts = statueParts.length;
	let finishedParts = statueParts.filter((part) => part[1] !== null);

	return Math.round((finishedParts.length / totalParts) * 100);
}

export {
	validateFunctionName,
	getSkin,
	uploadSkin,
	canvasToBlob,
	blobToBase64,
	base64ToImage,
	createUUIDString,
	convertUUID,
	sanatizeName,
	download,
	determineProcessing,
	determineProgress,
	convertAlexSkin
}