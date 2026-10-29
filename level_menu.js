const createArcadiaMenu = () => {
	mainCtx.fillStyle = "#ffff33";
	mainCtx.font = 100 * SCALE + "px Arial";
	mainCtx.fillText("ARCADIA MODE", WIDTH * 0.5, HEIGHT * 0.15);
	mainCtx.font = 40 * SCALE + "px Arial";
	mainCtx.fillText("LEVEL PASSWORT HINZUFÜGEN:", WIDTH * 0.5, HEIGHT * 0.35);

	const pswInput = document.createElement("input");
	const w = SCREEN_WIDTH * 0.3;
	pswInput.style.position = "absolute";
	pswInput.style.left = (SCREEN_WIDTH - w) * 0.5 + "px";
	pswInput.style.top = SCREEN_HEIGHT * 0.5 + "px";
	pswInput.style.width = w + "px";
	pswInput.style.height = SCREEN_HEIGHT * 0.075 + "px";
	pswInput.style.backgroundColor = "#aaff55";
	pswInput.style.color = "#995500";
	pswInput.style.font = mainCtx.font;

	document.body.appendChild(pswInput);

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.4, SCREEN_HEIGHT * 0.7, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);
	const forwardBtn = new GuiButton("", SCREEN_WIDTH * 0.6, SCREEN_HEIGHT * 0.7, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, FORWARD_BUTTON_IMAGE_COORDS);
	const skipBtn = new GuiButton("SKIP", SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.7, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, forwardBtn, skipBtn);
		pswInput.remove();
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createDinoOverviewRoom();
	});

	let level = 1;

	forwardBtn.addEventListener("click", () => {
		const psw = pswInput.value.trim().toUpperCase();

		if (psw === "") {
			mainCtx.clearRect(0, HEIGHT * 0.375, WIDTH, HEIGHT * 0.1);
			mainCtx.fillStyle = "#ff0000";
			mainCtx.fillText("Keine Passwort hinzugefügt!", WIDTH * 0.5, HEIGHT * 0.425);

			return;
		}

		let pswCorrect = false;

		for (let i = 0; i < passwords.length; i++) {
			if (psw === passwords[i]) {
				pswCorrect = true;
				level = i + 2;
				break;
			}
		}

		if (pswCorrect) {
			GuiButton.destroy(backBtn, forwardBtn, skipBtn);
			pswInput.remove();
			mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

			createLevelMenu(level);
		} else {
			mainCtx.fillStyle = "#ff0000";
			mainCtx.clearRect(0, HEIGHT * 0.375, WIDTH, HEIGHT * 0.1);
			mainCtx.fillText("Dieses Passwort ist falsch!", WIDTH * 0.5, HEIGHT * 0.425);
		}
	});

	skipBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, forwardBtn, skipBtn);
			pswInput.remove();
			mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createLevelMenu(1);
	});
}

const createLevelMenu = (level) => {
	const xSpacing = SCREEN_WIDTH / 7;
	const ySpacing = SCREEN_HEIGHT / 6;

	const levelBtns = [];

	for (let i = 0; i < 25; i++) {
		const x = (i % 5 + 2) * xSpacing;
		const y = (Math.floor(i / 5) + 1) * ySpacing
		levelBtns[i] = new GuiButton(i + 1, x, y, ySpacing, ySpacing, document.body, NORMAL_BUTTON_IMAGE_COORDS);

		if (i + 1 > level) {
			levelBtns[i].deactivate();
		} else {
			levelBtns[i].addEventListener("click", () => {
				GuiButton.destroy(backBtn, ...levelBtns);

				resetGameDatas();
				prepareLevelForArcadia(LEVEL, i);
				setupGame(LEVEL);
			});
		}
	}

	const backBtn = new GuiButton("", xSpacing, ySpacing, ySpacing, ySpacing, document.body, BACK_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, ...levelBtns);

		createArcadiaMenu();
	});
}

const createTrainingMenu = () => {
	const btns = [];

	btns[0] = new GuiButton("HAND\nLAGEN", SCREEN_WIDTH * 0.33, SCREEN_HEIGHT * 0.33, SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.15, document.body, NORMAL_BUTTON_IMAGE_COORDS);
	btns[1] = new GuiButton("RANGE", SCREEN_WIDTH * 0.67, SCREEN_HEIGHT * 0.33, SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.15, document.body, NORMAL_BUTTON_IMAGE_COORDS);
	btns[2] = new GuiButton("TONARTEN", SCREEN_WIDTH * 0.33, SCREEN_HEIGHT * 0.67, SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.15, document.body, NORMAL_BUTTON_IMAGE_COORDS);
	btns[3] = new GuiButton("INTERVALLE", SCREEN_WIDTH * 0.67, SCREEN_HEIGHT * 0.67, SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.15, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	btns[0].addEventListener("click", () => {
		GuiButton.destroy(backBtn, ...btns);
		createHandPositionMenu();
	});
	btns[1].addEventListener("click", async() => {
		GuiButton.destroy(backBtn, ...btns);
		createRangeMenu(); 
	});

	btns[2].addEventListener("click", () => {
		GuiButton.destroy(backBtn, ...btns);
		createTonalityMenu();
	});
	btns[3].addEventListener("click", () => {
		GuiButton.destroy(backBtn, ...btns);
		createIntervalMenu();
	});

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, ...btns);

		createDinoOverviewRoom();
	});
}

const createHandPositionMenu = () => {
	const btnSets = [];
	
	btnSets[0] = new ButtonSet(["\ue050", "\ue062", "\ue050    \ue062"], SCREEN_WIDTH * 0.39, SCREEN_HEIGHT * 0.3, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Bravura");
	btnSets[1] = new ButtonSet(["C", "D", "E", "F", "G", "A", "B", "C↑"], SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.55, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Arial");
	btnSets[2] = new ButtonSet(["F↓", "G↓", "A↓", "B↓", "C", "D", "E", "F"], SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.8, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Arial");

	btnSets[2].deactivate();

	btnSets[0].btns[0].addEventListener("click", () => {btnSets[2].deactivate(); btnSets[1].activate()});
	btnSets[0].btns[1].addEventListener("click", () => {btnSets[1].deactivate(); btnSets[2].activate()});
	btnSets[0].btns[2].addEventListener("click", () => {btnSets[1].activate(); btnSets[2].activate()});

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);
	const playBtn = new GuiButton("PLAY!", SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		createTrainingMenu();
	});

	playBtn.addEventListener("click", () => {
		let staveNumber, clefs, ranges, tileSet;
		const on1 = btnSets[1].btnOnIndex;
		const on2 = btnSets[2].btnOnIndex;

		switch (btnSets[0].btnOnIndex) {
			case 0: staveNumber = 1; 
					clefs = ["treble"]; 
					ranges = [[Score.shiftNote("c4", on1), Score.shiftNote("c4", on1 + 4)]]; 
					tileSet = freeTileSet;
					break;
			case 1: staveNumber = 1; 
					clefs = ["bass"]; 
					ranges = [[Score.shiftNote("f2", on2), Score.shiftNote("f2", on2 + 4)]]; 
					tileSet = desertTileSet;
					break;
			case 2: staveNumber = 2; 
					clefs = ["treble", "bass"]; 
					ranges = [[Score.shiftNote("c4", on1), Score.shiftNote("c4", on1 + 4)], [Score.shiftNote("f2", on2), Score.shiftNote("f2", on2 + 4)]];
					tileSet = winterTileSet;
					break;
		}

		LEVEL.clear();
		LEVEL.category = "training";
		LEVEL.type = "hand-position";
		LEVEL.staveNumber = staveNumber;
		LEVEL.clefs = clefs;
		LEVEL.ranges = ranges
		LEVEL.accidental = "none";
		LEVEL.tileSet = tileSet;

		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		resetGameDatas();
		setupGame(LEVEL);
	});
}

const createRangeMenu = async() => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");

	const btnSets = [];
	btnSets[0] = new ButtonSet(["\ue050", "\ue062", "\ue050    \ue062"], SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.35, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1);
	btnSets[1] = new ButtonSet(["\ue261", "\ue262", "\ue260", "\ue262  \ue260"], SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.6, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1);
	btnSets[1].increase(0.75);

	const noteSliders = [];

	btnSets[0].btns[0].addEventListener("click", () => { getNoteSliders(noteSliders, "treble"); });	
	btnSets[0].btns[1].addEventListener("click", () => { getNoteSliders(noteSliders, "bass"); });	
	btnSets[0].btns[2].addEventListener("click", () => { getNoteSliders(noteSliders, "mixed"); });	

	getNoteSliders(noteSliders, "treble");

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);
	const playBtn = new GuiButton("PLAY!", SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();
		for (const noteSlider of noteSliders) noteSlider.destroy();

		createTrainingMenu();
	});

	playBtn.addEventListener("click", () => {
		let staveNumber, clefs, ranges, accidental;

		switch (btnSets[0].btnOnIndex) {
			case 0: staveNumber = 1; clefs = ["treble"]; ranges = [[noteSliders[0].note, noteSliders[1].note]]; tileSet = freeTileSet; break;
			case 1: staveNumber = 1; clefs = ["bass"]; ranges = [[noteSliders[0].note, noteSliders[1].note]]; tileSet = desertTileSet; break;
			case 2: staveNumber = 2; clefs = ["treble", "bass"]; ranges = [[noteSliders[0].note, noteSliders[1].note], [noteSliders[2].note, noteSliders[3].note]]; tileSet = winterTileSet; break;
		}

		switch(btnSets[1].btnOnIndex) {
			case 0: accidental = "none"; break;
			case 1: accidental = "#"; break;
			case 2: accidental = "b"; break;
			case 3: accidental = "mixed"; break;
		}

		LEVEL.clear();
		LEVEL.category = "training";
		LEVEL.type = "range";
		LEVEL.staveNumber = staveNumber;
		LEVEL.clefs = clefs;
		LEVEL.ranges = ranges;
		LEVEL.accidental = accidental;
		LEVEL.tileSet = tileSet;

		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();
		for (const noteSlider of noteSliders) noteSlider.destroy();
		noteSliders.splice(0, noteSliders.length);

		resetGameDatas();
		setupGame(LEVEL);
	});
}

const createTonalityMenu = async() => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");
	
	const btnSets = [];
	
	btnSets[0] = new ButtonSet(["\ue050", "\ue062", "\ue050    \ue062"], SCREEN_WIDTH * 0.39, SCREEN_HEIGHT * 0.3, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Bravura");
	btnSets[1] = new ButtonSet(["C dur \n A moll", "F dur \n D moll", "Bb dur \n G moll", "Eb dur \n C moll", "Ab dur \n F moll", "Db dur \n Bb moll", "Gb dur \n Eb moll", "Cb dur \n Ab moll", "G dur \n E moll", "D dur \n B moll", "A dur \n F# moll", "E dur \n C# moll", "B dur \n G# moll", "F# dur \n D# moll", "C# dur \n A# moll"], SCREEN_WIDTH * 0.16, SCREEN_HEIGHT * 0.5, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Arial");

	btnSets[1].breakPosition(1);
	btnSets[1].breakPosition(8);

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);
	const playBtn = new GuiButton("PLAY!", SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		createTrainingMenu();
	});

	playBtn.addEventListener("click", () => {
		let staveNumber, clefs, ranges;

		switch (btnSets[0].btnOnIndex) {
			case 0: staveNumber = 1; 
					clefs = ["treble"]; 
					ranges = [["c4", "c5"]]; 
					tileSet = freeTileSet;
					break;
			case 1: staveNumber = 1; 
					clefs = ["bass"]; 
					ranges = [["c3", "c4"]];
					tileSet = desertTileSet;
					break;
			case 2: staveNumber = 2; 
					clefs = ["treble", "bass"]; 
					ranges = [["c4", "c5"], ["c3", "c4"]];
					tileSet = winterTileSet;
					break;
		}


		const tonality = btnSets[1].names[btnSets[1].btnOnIndex].split(" ")[0];

		LEVEL.clear();
		LEVEL.category = "training";
		LEVEL.type = "tonality";
		LEVEL.staveNumber = staveNumber;
		LEVEL.clefs = clefs;
		LEVEL.ranges = ranges;
		LEVEL.accidental = "none";
		LEVEL.tonality = tonality;
		LEVEL.tileSet = tileSet;

		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		resetGameDatas();
		setupGame(LEVEL);
	});
}

const createIntervalMenu = async() => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");
	
	const btnSets = [];
	
	btnSets[0] = new ButtonSet(["\ue050", "\ue062", "\ue050    \ue062"], SCREEN_WIDTH * 0.39, SCREEN_HEIGHT * 0.3, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Bravura");
	btnSets[1] = new ButtonSet(["Sekunde", "Terz", "Quarte", "Quinte", "Sexte", "Septime", "Oktave"], SCREEN_WIDTH * 0.16, SCREEN_HEIGHT * 0.5, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Arial");
	btnSets[2] = new ButtonSet(["\ue261", "\ue262", "\ue260", "\ue262  \ue260"], SCREEN_WIDTH * 0.335, SCREEN_HEIGHT * 0.7, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, "Bravura");
	btnSets[2].increase(0.75);

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);
	const playBtn = new GuiButton("PLAY!", SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, NORMAL_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		createTrainingMenu();
	});

	playBtn.addEventListener("click", () => {
		let staveNumber, clefs, ranges, accidental;

		switch (btnSets[0].btnOnIndex) {
			case 0: staveNumber = 1; 
					clefs = ["treble"]; 
					ranges = [["c4", "c5"]];
					tileSet = freeTileSet;
					break;
			case 1: staveNumber = 1; 
					clefs = ["bass"]; 
					ranges = [["c3", "c4"]];
					tileSet = desertTileSet;
					break;
			case 2: staveNumber = 2; 
					clefs = ["treble", "bass"]; 
					ranges = [["c4", "c5"], ["c3", "c4"]];
					tileSet = winterTileSet;
					break;
		}

		switch(btnSets[2].btnOnIndex) {
			case 0: accidental = "none"; break;
			case 1: accidental = "#"; break;
			case 2: accidental = "b"; break;
			case 3: accidental = "mixed"; break;
		}

		const interval = btnSets[1].btnOnIndex + 1;

		LEVEL.clear();
		LEVEL.category = "training";
		LEVEL.type = "interval";
		LEVEL.staveNumber = staveNumber;
		LEVEL.clefs = clefs;
		LEVEL.ranges = ranges;
		LEVEL.accidental = accidental;
		LEVEL.interval = interval;
		LEVEL.tileSet = tileSet;

		GuiButton.destroy(backBtn, playBtn);
		for (const btnSet of btnSets) btnSet.destroy();

		resetGameDatas();
		setupGame(LEVEL);
	});
}