const scaleBtns = [];
const scaleBtnNames = ["HIGH QUALITY", "MEDIUM QUALITY", "LOW QUALITY"];
const scaleQualities = [1, 0.75, 0.5];

const createScaleMenu = () => {
	for (let i = 0; i < 3; i++) {
		scaleBtns[i] = createButton(scaleBtnNames[i], SCREEN_WIDTH / 2 + (i - 1) * 300, SCREEN_HEIGHT / 2, 200, 200, false);
		scaleBtns[i].addEventListener("click", () => {
			destroyButtons(...scaleBtns);
	
			setCanvasDimensions(scaleQualities[i]);
			setAllCanvas();

			createDinoOverviewRoom();
		});
	}	
}

const createDinoOverviewRoom = () => {
	document.documentElement.style.backgroundColor = BACKGROUND_COLOR;
	document.body.style.backgroundColor = BACKGROUND_COLOR;

	const dinoW = WIDTH * 0.5;
	mainCtx.drawImage(dinoOverviewImg, WIDTH * 0.5, HEIGHT * 0.1, dinoW, dinoW * 478 / 522);

	const btns = [];
	const btnX = SCREEN_WIDTH * 0.25;
	const btnY = SCREEN_HEIGHT * 0.15;
	const btnW = SCREEN_WIDTH * 0.1;
	const spacing = SCREEN_WIDTH * 0.12;
	let i = 0;
	
	btns.push(new GuiButton("ARCADIA", btnX, btnY + i++ * spacing, btnW * 2, btnW, document.body, NORMAL_BUTTON_IMAGE_COORDS));
	btns.push(new GuiButton("TRAINING", btnX, btnY + i++ * spacing, btnW * 2, btnW, document.body, NORMAL_BUTTON_IMAGE_COORDS));
	btns.push(new GuiButton("WIE FUNKTIONIERT", btnX, btnY + i++ * spacing, btnW * 2, btnW, document.body, NORMAL_BUTTON_IMAGE_COORDS));
	btns.push(new GuiButton("", btnX, btnY + i++ * spacing, btnW, btnW, document.body, SETTING_BUTTON_IMAGE_COORDS));

	btns[0].addEventListener("click", () => {
		GuiButton.destroy(...btns);
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createArcadiaMenu();
	});

	btns[1].addEventListener("click", () => {
		GuiButton.destroy(...btns);
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createTrainingMenu();
	});

	btns[2].addEventListener("click", () => {
		GuiButton.destroy(...btns);
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createRulesMenu(mainCtx);
	});

	btns[3].addEventListener("click", () => {
		GuiButton.destroy(...btns);
		mainCtx.clearRect(0, 0, WIDTH, HEIGHT);

		createSettingsMenu(SETTINGS);
	});
}

const createRulesMenu = (ctx) => {
	const span = document.createElement("span");
	span.style.position = "absolute";
	span.style.left = "0px";
	span.style.top = (SCREEN_HEIGHT * 0.05) + "px";
	span.style.width = SCREEN_WIDTH + "px";
	span.style.height = (SCREEN_WIDTH * 0.5) + "px";
	span.style.whiteSpace = "pre-line";
	span.style.textAlign = "center";
	document.body.appendChild(span);

	span.style.fontSize = (SCREEN_HEIGHT * 0.03) + "px";
	span.style.fontFamily = "Arial";
	span.textContent = `WILLKOMMEN BEI DINO NOTEN LESEN!

	Es gibt zwei Spielmodi: ARCADIA und TRAINING.

	Im Modus ARCADIA kannst du dich an 25 Schwierigkeitsstufen versuchen, die
	immer anspruchsvoller werden. Dabei werden die rechte Hand, die linke Hand
	und beide Hände zusammen, Vorzeichen und Tonarten trainiert.

	Im Modus TRAINING kannst du die verschiedenen Herausforderungen einzeln üben:
	- Lesen in bestimmten Hand-Lagen.
	- Lesen in bestimmten Intervallen.
	- Lesen in verschiedenen Tonarten.
	- Intervallübungen.

	Hilf Dino bei seinem Abenteuer! Um eine Note weiterzugehen, musst du nur
	einmal auf den Bildschirm tippen. Dino geht dann zur nächsten Note über.
	Wenn das Mikrofon aktiviert ist, genügt es, die richtige Note auf deinem
	Instrument zu spielen, damit Dino weitergehen kann.

	(ACHTUNG: In den Levels für beide Hände kann das Mikrofon aus technischen
	Gründen nicht verwendet werden.
	Du musst dem Schüler bzw. der Schülerin zuhören und den Bildschirm antippen,
	damit das Spiel fortgesetzt werden kann.)

	VIEL SPASS!
`

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		GuiButton.destroy(backBtn);
		span.remove();

		createDinoOverviewRoom();
	});
}

const createSettingsMenu = (settings) => {
	const btnSets = [];

	btnSets[0] = new ButtonSet(["30 s", "45 s", "60 s", "90 s", "120 s"], WIDTH * 0.1, HEIGHT * 0.5, WIDTH * 0.1, WIDTH * 0.1, "Arial");
	btnSets[0].turnOffAll();
	btnSets[0].turnOn(settings.timeIndex);

	btnSets[1] = new ButtonSet(["\ue1d2", "\ue1d3", "\ue1d5", "\ue1d7", "MIX"], WIDTH * 0.1, HEIGHT * 0.75, WIDTH * 0.1, WIDTH * 0.1, "Bravura")
	btnSets[1].turnOffAll();
	btnSets[1].turnOn(settings.durationIndex);

	const backBtn = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.1, document.body, BACK_BUTTON_IMAGE_COORDS);

	backBtn.addEventListener("click", () => {
		SETTINGS.timeIndex = btnSets[0].btnOnIndex;
		SETTINGS.time = parseInt(btnSets[0].names[SETTINGS.timeIndex]) * 1000;
		SETTINGS.durationIndex = btnSets[1].btnOnIndex;

		let duration = "w";

		switch(btnSets[1].names[SETTINGS.durationIndex]) {
			case "\ue1d3": duration = "h"; break;
			case "\ue1d5": duration = "q"; break;
			case "\ue1d7": duration = "8"; break;
			case "MIX": duration = "mixed"; break; 
		}

		SETTINGS.duration = duration;

		TOTAL_TIME = SETTINGS.time;

		for (const btnSet of btnSets) btnSet.destroy();
		GuiButton.destroy(backBtn);

		createDinoOverviewRoom();
	});
}

const micBtns = [];
const micBtnNames = ["MIC ON", "MIC OFF"];

const starter = () => {
	createScaleMenu();

	for (let i = 0; i < 2; i++) {
		micBtns[i] = createButton(micBtnNames[i], window.innerWidth / 2 + (i * 2 - 1) * 250, window.innerHeight / 2, 200, 200, document.body);
		micBtns[i].addEventListener("click", () => {
			destroyButtons(...micBtns);

			if (i === 0) {
				ignoreMic = false;

				startMic().then(() => {
					for (const btn of scaleBtns) document.body.appendChild(btn);
					document.body.requestFullscreen();
					stopMic();
				});
			} else {
				ignoreMic = true;

				for (const btn of scaleBtns) document.body.appendChild(btn);
				document.body.requestFullscreen();
			}
		});
	}	
};

starter();