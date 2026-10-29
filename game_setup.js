//=========================//
// SETUP GAME E FULLSCREEN //
//=========================//

let micStarted = false;

const setupGame = async (level) => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");
	await startMic();

	addBackgroundToCanvas(level.tileSet, mainCnv, TILE_SIZE);

	if (level.category === "arcadia") drawStars(mainCtx, starNumber, WIDTH * 0.55, HEIGHT * 0.015);
	
	backBtn = new GuiButton("", WIDTH * 0.1 / SCALE, HEIGHT * 0.1 / SCALE, 100, 100, document.body, BACK_BUTTON_IMAGE_COORDS);
	backBtn.addEventListener("click", () => {
		cancelAnimationFrame(ID);
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);
		animeCtx.clearRect(0, 0, WIDTH, HEIGHT);

		GuiButton.destroy(backBtn, pauseBtn);

		gameIsRunning = false;
		
		stopMic();

		const level = LEVEL;

		if (level.category === "arcadia") {
			createLevelMenu(level.level + 1);
		} else {
			switch(level.type) {
				case "hand-position": createHandPositionMenu(); break;
				case "range": createRangeMenu(); break;
				case "tonality": createTonalityMenu(); break;
				case "interval": createIntervalMenu(); break;
			}
		}

		LEVEL.clear();
	});

	pauseBtn = new TwoSidesGuiButton("", WIDTH * 0.2 / SCALE, HEIGHT * 0.1 / SCALE, 100, 100, document.body, PAUSE_BUTTON_IMAGE_COORDS, PLAY_BUTTON_IMAGE_COORDS);
	pauseBtn.addEventListener("click", (event) => {
		pauseBtn.toggle();

		if (pauseBtn.currentStatus === "running") {
			frameCounter = 0;
			mainLoop();
		} else {
			cancelAnimationFrame(ID);
		}
	});

	setupScore(level);
	fadingColor = level.color;

	dino = new Dino(noteXs[0] - 15, TILE_SIZE * (5 + TILE_Y_OFFSET), 3 * SCALE, animeCnv);

	dino.respawn();
	
	gameIsRunning = true;
	mainLoop();
};

//=================//
// CREAZIONE SCORE //
//=================//

const scores = [];

const setupScore = (level) => {
	const staveNum = level.staveNumber;
	const bgScreenCenterX = TILE_SIZE * 5.5;
	const staveWidth = WIDTH * 0.7;
	const x = bgScreenCenterX - staveWidth * 0.5; //(WIDTH - staveWidth) * 0.5;
	const xClef = WIDTH * 0.025;
	const staveHeight = SCORE_FONT_SIZE;
	const staveDistance = staveNum === 1 ? 0 : staveHeight * 2;
	const systemHeight = staveDistance + staveHeight;
	const bgScreenCenterY = TILE_SIZE * (2.5 + TILE_Y_OFFSET);
	const y = bgScreenCenterY - systemHeight * 0.5;
	
	const scoreOptions = [];
	let connector;

	let passedInTonality = level.tonality;

	if (passedInTonality instanceof Array) {
		passedInTonality = passedInTonality[Math.floor(Math.random() * passedInTonality.length)];
	}

	const {notes1, notes2, tonality} = getNoteSet(level, passedInTonality);

	if (tonality) passedInTonality = tonality;
	
	scoreOptions[0] = {
		staveX: x,
		staveY: y, 
		staveWidth: staveWidth,
		clef: level.clefs[0],
		xClef: xClef,
		keySignature: passedInTonality || "C",
		notes: notes1,
		fontSize: SCORE_FONT_SIZE,
		noteSpacing: RELATIVE_NOTE_SPACING
	};

	if (staveNum === 2) {
		scoreOptions[1] = {
			staveX: x,
			staveY: y + staveDistance, 
			staveWidth: staveWidth,
			clef: level.clefs[1],
			xClef: xClef,
			keySignature: passedInTonality || "C",
			notes: notes2,
			fontSize: SCORE_FONT_SIZE,
			noteSpacing: RELATIVE_NOTE_SPACING
		};
	}

	scores[0] = createScore(mainCnv, scoreOptions[0]);
	noteXs = scores[0].getNotesAbsoluteX();
	midiNoteSet = scores[0].getNoteMidis();

	if (staveNum === 2) {
		scores[1] = createScore(mainCnv, scoreOptions[1]);
		connector = Score.createConnector(scores[0], scores[1]);
	}

	for (const score of scores) score.draw();
	if (connector) connector.draw();
}

//=======================//
// CANVAS DI PENTAGRAMMA //
//=======================//

const createScore = (cnv, options) => {
	const noteSpacing = options.noteSpacing || 1;
	const clef = options.clef || "treble";
	const keySignature = options.keySignature || "C";
	const x = options.staveX || 0;
	const y = options.staveY || 0;
	const w = options.staveWidth || 100;
	const notes = options.notes || [];
	const fontSize = options.fontSize || 60;
	const xClef = options.xClef || 20;

	const score = new Score(cnv, fontSize);

	score.addStave(x, y, w);
	score.addClef(clef, {xOffset: SCORE_FONT_SIZE * 0.1});
	score.addKeySignature(keySignature);

	RELATIVE_NOTE_SPACING = score.getBestNoteSpacing(8);
	
	score.setDuration(SETTINGS.duration);
	score.addNotes(notes, {spacing: RELATIVE_NOTE_SPACING});

	return score;
}

const updateScore = (level) => {
	punteggioTotale++;
	punteggioParziale++;
	midiTargetIndex++;

	mainCtx.clearRect(0, 0, WIDTH, HEIGHT);
	addBackgroundToCanvas(level.tileSet, mainCnv, TILE_SIZE);
	if (level.category === "arcadia") drawStars(mainCtx, starNumber, WIDTH * 0.55, HEIGHT * 0.015);

	for (let i = 0; i < scores[0].notes.length; i++) {
		const color = scores[0].notes[i].color;

		if (color === "#000000") {
			scores[0].notes[i].color = "#66666688";
			
			if (scores[1]) {
				scores[1].notes[i].color = "#66666688";
			}
			
			break;
		}
	}


	for (let score of scores) score.draw();
	if (scores[1]) Score.createConnector(scores[0], scores[1]).draw();
}

//==================//
// RESET GAME DATAS //
//==================//

const resetGameDatas = () => {
	punteggioTotale = 0;
	punteggioParziale = 0;
	prevPunteggioTotale = -1;
	scores.splice(0, scores.length);
	time = TOTAL_TIME;
	frameCounter = 0;
	midiTargetIndex = 0;
	fadingAlpha = 0;
	starNumber = 0;
}

document.addEventListener("fullscreenchange", () => {
	if (document.fullscreenElement) {
		startMic();
	} else {
		stopMic();
	}
});