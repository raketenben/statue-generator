let status = document.getElementById("status");
let progress = document.getElementById("progress");
let inputForm = document.getElementById("input");
let playernameInput = document.getElementById("playername");
let fileInput = document.getElementById("skinfile");

let downloadButton = document.getElementById("download");

let statueList = document.getElementById("statue-list");

let preview = document.getElementById("preview");

let copy = document.getElementById("copy");


inputForm.addEventListener("submit", generate);

let datapackStatues = {};

let noHandItemInFirstN = 6;
let handSide = [true, true, false, false, true, true, false, false, false, false, false, true, true, true, false, false, false, true, true, true, false, false, false, true, true, true];

let baseTags = ["statue"];

let tags = [
    ["head", "head-left", "head-top-left-back"],
    ["head", "head-left", "head-bottom-left-back"],
    ["head", "head-right", "head-top-right-back"],
    ["head", "head-right", "head-bottom-right-back"],
    ["head", "head-left", "head-top-left-front"],
    ["head", "head-left", "head-bottom-left-front"],
    ["head", "head-right", "head-top-right-front"],
    ["head", "head-right", "head-bottom-right-front"],
    ["arm-right", "arm-right-1"],
    ["arm-right", "arm-right-2"],
    ["arm-right", "arm-right-3"],
    ["arm-left", "arm-left-1"],
    ["arm-left", "arm-left-2"],
    ["arm-left", "arm-left-3"],
    ["leg-right", "leg-right-1"],
    ["leg-right", "leg-right-2"],
    ["leg-right", "leg-right-3"],
    ["leg-left", "leg-left-1"],
    ["leg-left", "leg-left-2"],
    ["leg-left", "leg-left-3"],
    ["chest", "chest-top-right"],
    ["chest", "chest-middle-right"],
    ["chest", "chest-bottom-right"],
    ["chest", "chest-top-left"],
    ["chest", "chest-middle-left"],
    ["chest", "chest-bottom-left"],
    ["main", "live"],
    ["neck"],
    ["shoulder-right"],
    ["shoulder-left"],
    ["hip-right"],
    ["hip-left"],
];

//backside -    ,dx:3,dy:1
//front -       ,dx:1,dy:1
//left -        ,dx:2,dy:1
//right -       ,dx:0,dy:1
//top -         ,dx:1,dy:0
//bottom -      ,dx:2,dy:0

let mappings = [
    [
        /* head backside*/
        { sx: 5, sy: 2, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 6, sy: 2, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 0, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 5, sy: 3, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 6, sy: 3, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 5, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 0, sy: 2, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 7, sy: 2, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 0, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 0, sy: 3, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 7, sy: 3, dx: 3, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 4, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        /* head front*/
        { sx: 4, sy: 2, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 2, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 1, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 4, sy: 3, dx: 2, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 3, sy: 3, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 5, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 1, sy: 2, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 2, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 1, dx: 1, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        { sx: 1, sy: 3, dx: 0, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 2, sy: 3, dx: 1, dy: 1, rotation: 0, osx: 8, osy: 0 },
        { sx: 4, sy: 0, dx: 2, dy: 0, rotation: 0, osx: 8, osy: 0 },
    ],
    [
        /* arm right*/
        { sx: 11, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 11, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 11, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 10, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 11, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 12, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 13, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
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
    [
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
    [
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
    [
        /* leg right*/
        { sx: 1, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 1, sy: 5, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 5, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 1, sy: 6, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 0, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 1, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 2, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 3, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
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
    [
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
    [
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
    [
        /* body right*/
        { sx: 5, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 4, sy: 5, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 4, sy: 6, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 7, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 4, sy: 7, dx: 0, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 5, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 9, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        /* body left*/
        { sx: 6, sy: 4, dx: 1, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 6, sy: 5, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 5, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 5, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 6, sy: 6, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 6, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 6, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ],
    [
        { sx: 8, sy: 4, dx: 2, dy: 0, rotation: 0, osx: 0, osy: 4 },
        { sx: 6, sy: 7, dx: 1, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 7, sy: 7, dx: 2, dy: 1, rotation: 0, osx: 0, osy: 4 },
        { sx: 8, sy: 7, dx: 3, dy: 1, rotation: 0, osx: 0, osy: 4 },
    ]
];

async function generate(evt) {
    evt.preventDefault();

    playernameInput.disabled = true;
    status.innerText = "Initializing";
    preview.innerHTML = "";

    let _playername = playernameInput.value;

    let avilableImage = checkImage();
    console.log(avilableImage)

    let image = document.createElement("img");
    if (avilableImage) {
        playernameInput.value = avilableImage.name.split(".").reverse()[1];
        let skinBlob = await convertAlexSkin(avilableImage);
        image.src = window.URL.createObjectURL(skinBlob);
    } else {
        let skinBlob = await getSkin(_playername);
        image.src = window.URL.createObjectURL(skinBlob);
    }
    skin = preview.appendChild(image);

    image.onload = async() => {
        let generatedSkins = await generateSkins(skin);
        let skinData = await uploadHeads(generatedSkins);
        console.log(skinData)
        generateSummonCommand(skinData);
    }
}

function checkImage() {
    console.log(fileInput.files);
    if (!fileInput.files || !fileInput.files[0]) return false;
    return fileInput.files[0];
}

function generateSkins(skinImage) {

    function doubleTiles(dst, src, sx, sy, dx, dy, rotation, osx, osy) {
        mapTiles(dst, src, sx, sy, dx, dy, rotation);
        mapTiles(dst, src, sx + osx, sy + osy, dx + 4, dy, rotation);
    }

    async function mapTiles(dst, src, sx, sy, dx, dy, rotation) {
        let _tile = new OffscreenCanvas(8, 8);
        var _tilectx = _tile.getContext("2d");
        _tilectx.imageSmoothingEnabled = false;
        _tilectx.drawImage(src, sx * 4, sy * 4, 4, 4, 0, 0, 8, 8);
        _tilectx.translate(4, 4);
        _tilectx.rotate((Math.PI / 2) * rotation);
        dst.drawImage(_tile, dx * 8, dy * 8, 8, 8);
    }

    return new Promise(async(res, rej) => {
        let returnArray = new Array();
        for (let i = 0; i < 26; i++) {
            let _canvas = new OffscreenCanvas(64, 64);
            let _ctx = _canvas.getContext("2d");
            _ctx.imageSmoothingEnabled = false;

            let _mappings = mappings[i];

            for (let x = 0; x < _mappings.length; x++) {
                const _mapping = _mappings[x];
                doubleTiles(_ctx, skinImage, _mapping.sx, _mapping.sy, _mapping.dx, _mapping.dy, _mapping.rotation, _mapping.osx, _mapping.osy, _mapping.odx, _mapping.ody);
            }

            let _imageBlob = await _canvas.convertToBlob();

            returnArray.push(_imageBlob);
        }
        return res(returnArray);
    });
}

function uploadHeads(array) {
    return new Promise((res, rej) => {
        let i = 0;
        let returnData = new Array();

        function next() {
            uploadSkin(array[i]).then((res) => res.json()).then((data) => {
                if (!data.error) {
                    returnData.push(data.data);
                    status.innerText = `${i+1}/26 - ${(25-i)*5} seconds remaining`;
                    progress.value = i;
                    if (i != array.length - 1) {
                        i++;
                        setTimeout(next, calcTimeout(data));
                    } else {
                        return res(returnData);
                    }
                } else {
                    setTimeout(next, calcTimeout(data));
                }
            }, () => {
                next();
            });
        }
        next();

        function calcTimeout(data) {
            var nextRequest = new Date().setTime(data.nextRequest * 1000);
            var curTime = new Date();
            var t = (nextRequest - curTime > 0) ? nextRequest - curTime : 5000;
            console.info("WAITING", t);
            return t;
        }
    });
}

function uploadSkin(blob) {
    return new Promise((res, rej) => {
        var formData = new FormData();
        formData.append('file', blob);
        fetch("https://api.mineskin.org/generate/upload", {
            method: 'POST',
            body: formData
        }).then((response) => {
            res(response)
        }, rej);
    });
}

function generateSummonCommand(skins) {
    let summonCommandArray = new Array;
    for (let i = 0; i < tags.length; i++) {
        const element = tags[i];
        let _uuid = (i < mappings.length) ? createUUIDString(convertUUID(skins[i].uuid)) : "";
        let _texture = (i < mappings.length) ? skins[i].texture.value : "";
        let _signature = (i < mappings.length) ? skins[i].texture.signature : "";
        let _tag = `tag:{SkullOwner:{Id:${_uuid},Properties:{textures:[{ Value:"${_texture}",Signature:"${_signature}"}]}}}`;
        let _summonCommand = generateSingleCommand(element, handSide[i], i < mappings.length, _tag);
        summonCommandArray.push(_summonCommand);
    }
    status.innerText = "Finished!";
    datapackStatues[playernameInput.value] = summonCommandArray.join("\n");
    localStorage.setItem("datapackStatues", JSON.stringify(datapackStatues));
    playernameInput.disabled = false;
    updateStatueList();
}

function generateSingleCommand(_tags, _right, _hand, _tag) {
    let _combinedTags = _tags.concat(baseTags);
    let _handItems = (_right) ? `{Count:1b,id:"minecraft:player_head",${_tag}},{}` : `{},{Count:1b,id:"minecraft:player_head",${_tag}}`;
    return `summon minecraft:armor_stand ~ ~ ~ {Invulnerable:1b,DisabledSlots:2096896,Tags:["${_combinedTags.join("\",\"")}"],HandItems:[${(_hand) ? _handItems : "{},{}"}],Marker:1b,ShowArms:1b,NoGravity:1b,NoBasePlate:1b,Invisible:1b}`;
}

function createUUIDString(uuid) {
    return `[I;${uuid[0]},${uuid[1]},${uuid[2]},${uuid[3]}]`;
}

function convertUUID(uuid) {
    uuid = uuid.replaceAll("-", "")

    var uuidIntArray = new Array();

    if (uuid.length != 32) return Error("No");

    for (let i = 0; i < 4; i++) {
        const element = uuid.substr(i * 8, 8);
        const n = hexToInt(element)
        uuidIntArray.push(n);
    }
    return uuidIntArray;
}

function hexToInt(hex) {
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

function convertAlexSkin(blob) {
    return new Promise((res, rej) => {
        let _canvas = new OffscreenCanvas(64, 64);
        let _ctx = _canvas.getContext("2d");
        _ctx.imageSmoothingEnabled = false;
        let _img = new Image();
        _img.src = URL.createObjectURL(blob);
        _img.onload = () => {
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
            let _imageBlob = _canvas.convertToBlob();
            res(_imageBlob);
        }
    });

}

function getSkin(_playername) {
    return new Promise((res, rej) => {
        fetch(`https://minotar.net/skin/${_playername}`).then((res) => res.blob()).then(convertAlexSkin).then((_blob) => {
            res(_blob);
        }).catch(() => {
            rej(showError("Skin request failed"));
        })
    });
}

function showError(text) {
    status.innerText = text
    throw Error(text);
}

function loadDatapack() {
    return fetch('./statue.zip')
        .then(function(response) {
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then(JSZip.loadAsync)
        .then(function(zip) {
            return zip
        })
}

function removeStatue(name) {
    delete datapackStatues[name];
    localStorage.setItem("datapackStatues", JSON.stringify(datapackStatues));
    updateStatueList();
}

function updateStatueList() {
    statueList.innerHTML = "";
    if (Object.keys(datapackStatues).length > 0) {
        statueList.innerHTML += `<tr><td>Name</td><td>Command</td><td></td></tr>`;
        for (var key in datapackStatues) {
            const element = datapackStatues[key];
            statueList.innerHTML += `<tr><td>${key}</td><td><p>/function statue:summon/${sanatizeName(key)}</p></td><td><a href="#" onclick="removeStatue('${key}')">Remove</a></td></tr>`;
        }
    } else {
        statueList.innerHTML += `<tr><td>No statue generated yet</td></tr>`;
    }
    downloadButton.style.display = (Object.keys(datapackStatues).length > 0) ? "block" : "none";
}

function download(blob, name) {
    var a = document.createElement("a");
    a.classList.add("download");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
}

async function generateDatapack() {
    let datapack = await loadDatapack();

    for (var key in datapackStatues) {
        const element = datapackStatues[key];
        datapack.file(`data/statue/functions/summon/${sanatizeName(key)}.mcfunction`, element);
    }

    datapack.generateAsync({ type: "blob" }).then(function(blob) {
        download(blob, "statue.zip");
    }, function(err) {
        alert(err);
    });
    console.log(datapack);
}

function sanatizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9/._-]/g, "");
}

(() => {
    let statues = localStorage.getItem("datapackStatues");
    if (statues) {
        datapackStatues = JSON.parse(statues);
    }
    updateStatueList();
})();