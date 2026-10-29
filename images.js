const getImage = (path) => {
	const img = new Image();
	img.src = path;

	return img;	
}

const getImageSet = (folderName, nameSet, ext = ".png") => {
	const folder = folderName;

	const tileSet = [];
	let i = 0;

	for (let name of nameSet) {
		const path = folder + "\\" + name + ext;
		tileSet[i++] = getImage(path);
	}

	return tileSet;
}

const addBackgroundToCanvas = (ts, cnv, size, showEverything = true) => {
	const ctx = cnv.getContext("2d");
	const yOffset = TILE_Y_OFFSET;
	
	ctx.drawImage(ts[0], 0, 0, cnv.width, cnv.height);

	//acqua
	if (ts[13].width) for (let i = 0; i < 12; i++) ctx.drawImage(ts[13], size * i, size * 6.75, size, size);
	if (ts[14].width) for (let i = 0; i < 12; i++) ctx.drawImage(ts[14], size * i, size * 6, size, size);


	if (!showEverything) return;


	//terreno
	ctx.drawImage(ts[10], size * 1, size * (5 + yOffset), size, size);
	for (let i = 2; i < 9; i++) ctx.drawImage(ts[11], size * i, size * (5 + yOffset), size, size);
	ctx.drawImage(ts[12], size * 9, size * (5 + yOffset), size, size);

	//schermo sopra
	ctx.drawImage(ts[1], size * 0.5, size * (0.5 + yOffset), size, size);
	ctx.drawImage(ts[3], size * 9.5, size * (0.5 + yOffset), size, size);
	for (let i = 1; i < 9; i++) ctx.drawImage(ts[2], size * (i + 0.5), size * (0.5 + yOffset), size, size);

	//schermo centro
	ctx.drawImage(ts[4], size * 0.5, size * (2.5 + yOffset), size, size);
	ctx.drawImage(ts[6], size * 9.5, size * (2.5 + yOffset), size, size);
	for (let i = 1; i < 9; i++) ctx.drawImage(ts[5], size * (i + 0.5), size * (2.5 + yOffset), size, size);

	ctx.drawImage(ts[4], size * 0.5, size * (1.5 + yOffset), size, size);
	ctx.drawImage(ts[6], size * 9.5, size * (1.5 + yOffset), size, size);
	for (let i = 1; i < 9; i++) ctx.drawImage(ts[5], size * (i + 0.5), size * (1.5 + yOffset), size, size);

	//schermo sotto
	ctx.drawImage(ts[7], size * 0.5, size * (3.5 + yOffset), size, size);
	ctx.drawImage(ts[9], size * 9.5, size * (3.5 + yOffset), size, size);
	for (let i = 1; i < 9; i++) ctx.drawImage(ts[8], size * (i + 0.5), size * (3.5  + yOffset), size, size);

	//schermo bianco
	ctx.fillStyle = "#ffffff99";
	ctx.fillRect(size * 1, size * (1 + yOffset), size * 9, size * 3);

	//barra energia
	ctx.drawImage(ts[2], size * 10.75, size * 0.25, size, size);
	ctx.drawImage(ts[8], size * 10.75, size * 5.25, size, size);
	for (let i = 1; i <= 4; i++) ctx.drawImage(ts[5], size * 10.75, size * (i + 0.25), size, size);

	LIFE_BAR_DIM.x = size * 11;
	LIFE_BAR_DIM.y = size * 0.75;
	LIFE_BAR_DIM.w = size * 0.5;
	LIFE_BAR_DIM.h = size * 5;
	
	const {x, y, w, h} = LIFE_BAR_DIM;

	ctx.fillRect(x, y, w, h);

	//icona del punteggio
	ctx.drawImage(ts[2], size * 5, size * 0, size, size);
}

const freeTileSet = getImageSet("freetileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);
const desertTileSet = getImageSet("deserttileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);
const winterTileSet = getImageSet("wintertileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);

const tileSets = [freeTileSet, desertTileSet, winterTileSet];

const dinoImgs = getImageSet("freedinosprite", [
	"Idle(1)",
	"Idle(2)",
	"Idle(3)",
	"Idle(4)",
	"Idle(5)",
	"Idle(6)",
	"Idle(7)",
	"Idle(8)",
	"Idle(9)",
	"Idle(10)",
	"Jump(1)",
	"Jump(2)",
	"Jump(3)",
	"Jump(4)",
	"Jump(5)",
	"Jump(6)",
	"Jump(7)",
	"Jump(8)",
	"Jump(9)",
	"Jump(10)",
	"Dead(1)",
	"Dead(2)",
	"Dead(3)",
	"Dead(4)",
	"Dead(5)",
	"Dead(6)",
	"Dead(7)",
	"Dead(8)"
	]
);

const zzz = getImageSet("zzz", ["zzz"])[0];

const dinoOverviewImg = getImageSet("logos", ["dino1"])[0];

const stars = getImageSet("stars", ["stars"])[0];

const STAR_OFF_COORDS_1 = [175, 20, 150, 150];
const STAR_OFF_COORDS_2 = [175, 170, 150, 150];
const STAR_ON_COORDS = [175, 317, 150, 150];
const STAR_ROW_WIDTH = 375;

const drawStars = (ctx, n, x, y) => {
	for (let i = 0; i < 5; i++) {
		if (i >= n) ctx.drawImage(stars, ...STAR_OFF_COORDS_1, x + i * 75, y, 75, 75);
		else ctx.drawImage(stars, ...STAR_ON_COORDS, x + i * 75, y, 75, 75);
	}
}