class NoteSlider {
	constructor(x, y, w, h, clef, firstNote, fontSize) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.clef = clef;
		this.note = firstNote;
		this.cnv = document.createElement("canvas");
		this.ctx = this.setupCanvas();
		this.fontSize = fontSize;

		this.score = new Score(this.cnv, this.fontSize);
		this.score.addStave(0, this.h * 0.33, this.w)
		this.score.addClef(this.clef);
		this.score.addNotes([this.note]);

		this.midi = this.score.getNoteMidis()[0];

		this.upBtn = this.getButton("▲");
		this.downBtn = this.getButton("▼");
	}

	static entangle(ns1, ns2) {
		ns1.upBtn.addEventListener("click", () => {
			if (ns1.midi >= ns2.midi) {
				ns2.changeNote(1);
				ns2.updateScore();
			}
		});

		ns2.downBtn.addEventListener("click", () => {
			if (ns1.midi >= ns2.midi) {
				ns1.changeNote(-1);
				ns1.updateScore();
			}
		});
	}

	setupCanvas() {
		this.cnv.width = this.w;
		this.cnv.height = this.h;

		this.cnv.style.position = "absolute";
		this.cnv.style.left = this.x + "px";
		this.cnv.style.top = this.y + "px";
		this.cnv.style.width = this.w + "px";
		this.cnv.style.height = this.h + "px";
		
		this.cnv.style.zIndex = "999";

		return this.cnv.getContext("2d");
	}

	getButton(dir) {
		let yOff = 0;
		let direction = 1;

		if (dir === "▼") {
			yOff += this.h - this.score.lineSpacing * 2;
			direction = -1;
		}

		const btn = document.createElement("button");
		btn.textContent = dir;
		btn.style.position = "absolute";
		btn.style.left = (this.x + this.w) + "px";
		btn.style.top = (this.y + yOff) + "px";
		btn.style.width = (this.w * 0.2) + "px";
		btn.style.height = btn.style.width;

		btn.addEventListener("click", () => {
			this.changeNote(direction);
			this.updateScore();
		});

		return btn;
	}

	changeNote(dir) {
		const notePool = ["c", "d", "e", "f", "g", "a", "b"];
		const prevNote = this.note[0];
		const prevOkt = this.note[this.note.length - 1];
		const prevAcc = this.note.length === 3 ? this.note[1] : "";

		let index = -1;

		for (let i = 0; i < notePool.length; i++) {
			if (prevNote === notePool[i]) {
				index = i;
				break;
			}
		}

		let nextNote;
		let nextOkt = prevOkt;

		if (index === 6 && dir === 1) {
			nextNote = "c";
			nextOkt++;
		} else if (index === 0 && dir === -1) {
			nextNote = "b";
			nextOkt--;
		} else {
			index += dir;
			nextNote = notePool[index];
		}

		this.note = nextNote + prevAcc + nextOkt;
	}

	updateScore() {
		this.score.addNotes([this.note]);
		this.midi = this.score.getNoteMidis()[0];

		this.score.ctx.fillStyle = "#eeeeee";
		this.score.ctx.fillRect(0, 0, this.w, this.h);
		
		this.score.draw();
	}

	draw() {
		this.ctx.fillStyle = "#eeeeee";
		this.ctx.fillRect(0, 0, this.w, this.h);
		
		document.body.appendChild(this.cnv);
		document.body.appendChild(this.upBtn);
		document.body.appendChild(this.downBtn);


		this.score.draw();
	}

	destroy() {
		this.upBtn.remove();
		this.downBtn.remove();
		this.cnv.remove();
	}
}

const getNoteSliders = (noteSliderArray, type) => {
	for (const noteSlider of noteSliderArray) noteSlider.destroy();
	noteSliderArray.splice(0, noteSliderArray.length);

	if (type === "treble") {
		noteSliderArray[0] = new NoteSlider(SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.25,  SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "treble", "c4", SCORE_FONT_SIZE);
		noteSliderArray[1] = new NoteSlider(SCREEN_WIDTH * 0.7,  SCREEN_HEIGHT * 0.25,  SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "treble", "g4", SCORE_FONT_SIZE);
		
		NoteSlider.entangle(noteSliderArray[0], noteSliderArray[1]);

	} else if (type === "bass") {
		noteSliderArray[0] = new NoteSlider(SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.25, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "bass",   "c3", SCORE_FONT_SIZE);
		noteSliderArray[1] = new NoteSlider(SCREEN_WIDTH * 0.7,  SCREEN_HEIGHT * 0.25, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "bass",   "g3", SCORE_FONT_SIZE);

		NoteSlider.entangle(noteSliderArray[0], noteSliderArray[1]);	
	} else if (type === "mixed") {
		noteSliderArray[0] = new NoteSlider(SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.25,  SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "treble", "c4", SCORE_FONT_SIZE);
		noteSliderArray[1] = new NoteSlider(SCREEN_WIDTH * 0.7,  SCREEN_HEIGHT * 0.25,  SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "treble", "g4", SCORE_FONT_SIZE);
		noteSliderArray[2] = new NoteSlider(SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "bass",   "c3", SCORE_FONT_SIZE);
		noteSliderArray[3] = new NoteSlider(SCREEN_WIDTH * 0.7,  SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.2, "bass",   "g3", SCORE_FONT_SIZE);

		NoteSlider.entangle(noteSliderArray[0], noteSliderArray[1]);
		NoteSlider.entangle(noteSliderArray[2], noteSliderArray[3]);
	} else {
		throw new Error("Tipo di Note Slider non riconosciuto");

		return;
	}

	for (const noteSlider of noteSliderArray) noteSlider.draw();
}