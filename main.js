//====================//
// VARIABILI DI GIOCO //
//====================//

const LEVEL = {
	category: null,
	type: null,
	level: null,
	ranges: null,
	noteSets: null,
	accidental: null,
	tonality: null,
	interval: null,
	_staveNumber:null,
	_clefs: null,
	_tileSet: null,
	_color: null,

	set clefs(cls) {
		this._clefs = cls;
		this._staveNumber = cls?.length || null;
	},

	set tileSet(ts) {
		this._tileSet = ts;
		const i = [freeTileSet, desertTileSet, winterTileSet].indexOf(ts);
		this._color = i < 0 ? null : levelColors[i];
	},

	get staveNumber() {return this._staveNumber;},
	get clefs() {return this._clefs;},
	get tileSet() {return this._tileSet;},
	get color() {return this._color;},

	clear() {
		for (let prop in this) {
			if (typeof this[prop] !== "function") {
				this[prop] = null;
			}
		}
	}
};

let noteXs;
let midiNoteSet;
let midiTargetIndex = 0;

let gameIsRunning = false;

let dino;

let time = TOTAL_TIME;
let timeFromLastFrame = 0;

let punteggioTotale = 0;
let punteggioParziale = 0;
let prevPunteggioTotale = -1;
let starNumber = 0;

let ID;
let frameCounter = 0;
let ignoreMic = false;

let backBtn, pauseBtn;

// ==============//
// LOOP DI GIOCO //
//===============//

const mainLoop = () => {
	ID = requestAnimationFrame(mainLoop);
	frameCounter++;

	//time setting
	const gameOver = time < 0;
	
	const now = performance.now();
	timeFromLastFrame = now - timeFromLastFrame;

	if (frameCounter > 3) time -= timeFromLastFrame;
	timeFromLastFrame = now;

	const level = LEVEL;

	//update
	if (gameOver && !dino.dead && !dino.isJumping) {
		dino.toDeath();

		GuiButton.destroy(backBtn, pauseBtn);
		stopMic();
	}

	if (currentMidiPitch === midiNoteSet[midiTargetIndex]) {
		if (midiNoteSet[midiTargetIndex] === midiNoteSet[midiTargetIndex + 1]) {
			workletNode.port.postMessage("stopYinDetection");
		}

		dino.jump(RELATIVE_NOTE_SPACING);
	}

	dino.update(ID);

	if (punteggioParziale >= 8) {
		punteggioParziale = 0;
		starNumber++;

		if (starNumber > 5) {
			starNumber = 5;
		}
		
		animeCtx.clearRect(0, 0, WIDTH - TILE_SIZE * 2, HEIGHT);

		addBackgroundToCanvas(level.tileSet, mainCnv, TILE_SIZE);
		if (level.category === "arcadia") drawStars(mainCtx, starNumber, WIDTH * 0.55, HEIGHT * 0.015);
		setupScore(level);
		
		dino.respawn();

		midiTargetIndex = 0;
		midiNoteSet = scores[0].getNoteMidis();
	}

	//graphics
	if (!gameOver && ID % 8 === 0) {
		const {x, y, w, h} = LIFE_BAR_DIM;
		const barLifeHeight = -time / TOTAL_TIME * h;

		animeCtx.clearRect(x, y, w, h);
		
		animeCtx.fillStyle = setLifeBarColor(time);
		animeCtx.fillRect(x, y + h, w, barLifeHeight);
	}

	if (punteggioTotale !== prevPunteggioTotale) {
		animeCtx.clearRect(TILE_SIZE * 5, 0, TILE_SIZE, TILE_SIZE);

		const punteggioDim = animeCtx.measureText(punteggioTotale);
		const punteggioW2 = punteggioDim.width / 2;
		const punteggioH2 = SCORE_FONT_SIZE / 2;

		animeCtx.fillStyle = level.color;
		animeCtx.fillText(punteggioTotale, TILE_SIZE * 5.5 - punteggioW2, TILE_SIZE * 0.5 + punteggioH2);

		prevPunteggioTotale = punteggioTotale;
	}

	animeCtx.clearRect(dino.x - 50, dino.y - 50, dino.w + 100, dino.h + 100);
	dino.draw();
}





//========================================//
// LOOP DI FADING PER LA FINE DEL LIVELLO //
//========================================//

let fadingColor;
let fadingAlpha = 0;

const endgameLoop = () => {
	ID = requestAnimationFrame(endgameLoop);

	const level = LEVEL;
	const levelCleared = starNumber >= 5;
	const alpha = fadingAlpha.toString(16).padStart(2, "0");
	const color = fadingColor + alpha;

	fadingCtx.fillStyle = color;
	fadingCtx.fillRect(0, 0, WIDTH, HEIGHT);

	if (ID % 4 === 0) fadingAlpha++;

	if (fadingAlpha > 30) {
		cancelAnimationFrame(ID);

		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);
		animeCtx.clearRect(0, 0, WIDTH, HEIGHT);

		fadingCtx.fillStyle = fadingColor;
		fadingCtx.fillRect(0, 0, WIDTH, HEIGHT);

		punteggioTotale += punteggioTotale == 1 ? " PUNKT!" : " PUNKTE!";

		const punteggioDim = fadingCtx.measureText(punteggioTotale);
		const punteggioW2 = punteggioDim.width / 2;
		const punteggioH2 = SCORE_FONT_SIZE / 2;

		fadingCtx.fillStyle = "#ff0000";
		fadingCtx.fillText(punteggioTotale, WIDTH / 2 - punteggioW2, HEIGHT / 4 + punteggioH2);
	
		if (level.category === "arcadia") {
			drawStars(fadingCtx, starNumber, (WIDTH - STAR_ROW_WIDTH) * 0.5, HEIGHT * 0.35);

			if (levelCleared) {
				fadingCtx.font = (SCORE_FONT_SIZE * 0.65) + "px Arial";
				
				let pswText;

				if (level.level < 24) {
					pswText = "Das Passwort von Level " + (level.level + 2) + " ist: " + passwords[level.level];
				} else {
					pswText = "Herzliche Glückwunsch! Du hast alle Ebene erledigt";
				}

				const pswWidth = fadingCtx.measureText(pswText).width;
				fadingCtx.fillText(pswText, (WIDTH - pswWidth) * 0.5, HEIGHT * 0.6);
			}
		}

		const endBtn = new GuiButton("", SCREEN_WIDTH * 0.45, SCREEN_HEIGHT * 0.75, 100, 100, document.body, BACK_BUTTON_IMAGE_COORDS);
		const rewindBtn = new GuiButton("", SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.75, 100, 100, document.body, REWIND_BUTTON_IMAGE_COORDS);

		endBtn.addEventListener("click", () => {
			animeCtx.clearRect(0, 0, WIDTH, HEIGHT);
			fadingCtx.clearRect(0, 0, WIDTH, HEIGHT);

			document.body.removeChild(fadingCnv);
			GuiButton.destroy(endBtn, rewindBtn, backBtn, pauseBtn);
			
			stopMic();
			
			if (level.category === "arcadia") {
				const next = levelCleared ? 2 : 1;
				createLevelMenu(level.level + next);
			} else {
				switch(level.type) {
					case "hand-position": createHandPositionMenu(); break;
					case "range": createRangeMenu(); break;
					case "tonality": createTonalityMenu(); break;
					case "interval": createIntervalMenu(); break;
				}
			}

			resetGameDatas();
			level.clear();
		});

		rewindBtn.addEventListener("click", () => {
			animeCtx.clearRect(0, 0, WIDTH, HEIGHT);
			fadingCtx.clearRect(0, 0, WIDTH, HEIGHT);

			fadingAlpha = 0;

			document.body.removeChild(fadingCnv);
			GuiButton.destroy(endBtn, rewindBtn, backBtn, pauseBtn);

			resetGameDatas();
			setupGame(LEVEL);
		});
	}
}


const setLifeBarColor = (t) => {
	const halfTime = TOTAL_TIME / 2;
	let red;
	let green;

	if (t > halfTime) {
		red = Math.floor(255 * (2 - t / halfTime));
		green = 255;
	} else {
		red = 255;
		green = Math.floor(t / halfTime * 255);
	}

	return "rgb(" + red + ", " + green + ", 0)";
}

console.log("DINO NOTEN LESEN LOADED IN: " + (performance.now() - performativeStartTime) + " ms")