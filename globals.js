let performativeStartTime = performance.now();

let SCALE;

const SCREEN_WIDTH = Math.max(screen.width, screen.height);
const SCREEN_HEIGHT = Math.min(screen.width, screen.height);

const BACKGROUND_COLOR = "#55ff55";

let WIDTH, HEIGHT;
let SCORE_FONT_SIZE, RELATIVE_NOTE_SPACING;
let TILE_SIZE, TILE_Y_OFFSET;

let LIFE_BAR_DIM;

const SETTINGS = {
	time: 20000,
	timeIndex: 0,
	duration: "w",
	durationIndex: 0
};
	
let TOTAL_TIME = SETTINGS.time;

const setCanvasDimensions = (scale) => {
	SCALE = scale;

	WIDTH = 1200 * scale;
	HEIGHT = 700 * scale;
	
	SCORE_FONT_SIZE = WIDTH * 0.05;
	RELATIVE_NOTE_SPACING = WIDTH * 0.08;
	
	TILE_SIZE = WIDTH / 12;
	TILE_Y_OFFSET = 0.5;
	
	LIFE_BAR_DIM = {x: null, y: null, w: null, h: null};
}

let mainCnv, mainCtx;
let animeCnv, animeCtx;
let fadingCnv, fadingCtx;

const setAllCanvas = () => {
	if (!SCALE) {
		console.error("SCALE NON DEFINITO");
	}

	mainCnv = createCanvas();
	mainCtx = setupCanvas(mainCnv, 0, 0, WIDTH, HEIGHT, document.body);
	mainCtx.textAlign = "center";

	animeCnv = createCanvas();
	animeCtx = setupCanvas(animeCnv, 0, 0, WIDTH, HEIGHT, document.body);
	animeCnv.style.pointerEvents = "none";
	animeCtx.font = SCORE_FONT_SIZE + "px bold Arial";

	fadingCnv = createCanvas();
	fadingCtx = setupCanvas(fadingCnv, 0, 0, WIDTH, HEIGHT, false)
	fadingCtx.font = "bold " + SCORE_FONT_SIZE + "px Helvetica";

	mainCnv.addEventListener("click", () => {
		if (gameIsRunning) {
			dino.jump(RELATIVE_NOTE_SPACING);
		}
	});
}