class Score {
	constructor(cnv, fontSize = 40) {
		this.cnv = cnv;
		this.ctx = this.cnv.getContext("2d");
		this.fontSize = fontSize;

		//font settings
		this.ctx.font = this.fontSize + "px Bravura";
		this.ctx.textAlign = "center";

		//elementi dello stave
		this.stave = false;
		this.clef = null;
		this.keySignature = null;
		this.notes = [];

		//coordinate assoulte di riferimento del canvas rispetto al document
		this.x = parseInt(this.cnv.style.left);
		this.y = parseInt(this.cnv.style.top);

		//coordinate delle linee rispetto al canvas
		this.xStave = 0;
		this.yStave = 0;
		this.wStave = 100;
		this.lineSpacing = this.fontSize * 0.25;

		//coordinate assolute della chiave
		this.xClef = this.xStave;
		this.yClef = this.yStave;

		//coordinate dell'armatura di chiave relative alla chiave
		this.keySignatureXOffset = 0;
		this.keySignatureXEnd = 0;
		this.keySignatureSpacing = 0;
		this.keySignatureFontSize = this.fontSize;
		this.keySignatureCoords = [];

		//note e midi
		this.midiNotes = [];
		this.duration = "w"; 
	}

	//==============//
	// STATIC UTILS //
	//==============//

	static getPseudoMidi(note) {
		const notePool = ["c", "d", "e", "f", "g", "a", "b"];
		const okt = parseInt(note[note.length - 1]);
		let noteNum = 0;

		for (let i = 0; i < notePool.length; i++) {
			if (note[0] === notePool[i]) {
				noteNum = i + okt * 7;
				break;
			}
		}

		return noteNum;
	}

	static shiftNote(note, interval) {
		const notePool = ["c", "d", "e", "f", "g", "a", "b"];
		const okt = parseInt(note[note.length - 1]);
		let noteNum = 0;

		for (let i = 0; i < notePool.length; i++) {
			if (note[0] === notePool[i]) {
				noteNum = i + okt * 7;
				break;
			}
		}

		const nextNum = noteNum + interval;

		const nextNote = notePool[nextNum % 7];
		const nextOkt = Math.floor(nextNum / 7);

		return nextNote + nextOkt;
	}

	static getInterval(...notes) {
		return Score.getPseudoMidi(notes[1]) - Score.getPseudoMidi(notes[0]);
	}

	static harmonize(note1, note2, range) {

	}

	static createConnector(sc1, sc2) {
		const begin = {x: sc1.xStave, y: sc1.yStave};
		const end = {x: sc2.xStave, y: sc2.yStave + 4 * sc2.lineSpacing};
		const ctx = sc1.ctx;

		const connector = {
			begin: begin,
			end: end,

			draw: () => {
				ctx.strokeStyle = "#000000";
				
				ctx.beginPath();
				ctx.moveTo(begin.x, begin.y);
				ctx.lineTo(end.x, end.y);
				ctx.stroke();

				const font = ctx.font;

				const w = ctx.measureText("\ue000").width;
				const h = end.y - begin.y;

				ctx.font = h + "px Bravura";
				ctx.fillStyle = "#000000";		

				ctx.fillText("\ue000", begin.x - w * 2, begin.y + h);

				ctx.font = font;
			}
		}

		return connector;
	}



	//=========//
	// SETTERS //
	//=========//

	setDuration(duration) {
		this.duration = duration;
	}





	//=========//
	// GETTERS //
	//=========//


	getMidiValues() {
		for (let i = 0; i < this.notes.length; i++) {
			const note = this.notes[i].note;
			const name = note[0];

			if (name === "m") {
				this.midiNotes[i] = -1;
				continue;
			}

			const okt = parseInt(note[note.length - 1]);

			let midi = 0;

			switch(name) {
				case "c": midi = 0; break;
				case "d": midi = 2; break;
				case "e": midi = 4; break;
				case "f": midi = 5; break;
				case "g": midi = 7; break;
				case "a": midi = 9; break;
				case "b": midi = 11; break;
			}

			let accidental = 0;

			if (note[1] === "#") {
				accidental++;
			} else if (note[1] === "b") {
				accidental--;
			}

			this.midiNotes[i] = (midi + accidental + 12 * (okt + 1));
		}
	}

	getNoteSpacing() {
		if (this.notes.length < 2) {
			console.warn("Impossibile calcolare il note spacing con meno di due note");
			return null;
		}

		return this.notes[1].x - this.notes[0].x;
	}

	getBestNoteSpacing(noteNumber) {
		return (this.xStave + this.wStave - this.keySignatureXEnd) / noteNumber;
	}

	getNotesAbsoluteX() {
		const noteXs = [];

		for (let note of this.notes) {
			noteXs.push(note.x);
		}

		return noteXs;
	}

	getNoteMidis() {
		return this.midiNotes;
	}



	//========//
	// ADDERS //
	//========//


	addStave(x, y, w) {
		this.stave = true;
		this.xStave = x || 10;
		this.yStave = y || 10;
		this.wStave = w || 100;

		return this;
	}

	addClef(clef = "treble", options = {}) {
		const xOffset = options.xOffset || 0;

		switch(clef) {
			case "\ue050":
			case "treble": 
				this.clef = "\ue050";
				this.yClef = this.yStave + 3 * this.lineSpacing; 
				break;
			case "\ue062":
			case "bass": 
				this.clef = "\ue062"; 
				this.yClef = this.yStave + this.lineSpacing;
				break;
			default: this.clef = null;
				throw new Error("Chiave non supportata");
		}

		this.xClef = this.xStave + this.ctx.measureText(this.clef).width * 0.5 + xOffset;

		return this;
	}

	addKeySignature(keySignature, options = {}) {
		this.keySignature = keySignature;

		const xOffset = options.xOffset + 0.5 * this.fontSize || 0.5 * this.fontSize;
		const spacing = options.spacing + 0.3 * this.fontSize || 0.3 * this.fontSize;
		const fontSize = options.fontSize || this.fontSize;

		this.keySignatureXOffset = this.xClef + xOffset;
		this.keySignatureSpacing = spacing;
		this.keySignatureFontSize = fontSize;

		const ksSet = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];

		for (let i = 0; i < ksSet.length; i++) {
			if (keySignature === ksSet[i]) {
				this.keySignatureCoords = KEY_SIGNATURE_COORDS[i];
				this.keySignatureXEnd = this.keySignatureXOffset + this.keySignatureCoords.length * this.keySignatureSpacing;

				return this;
			}
		}

		throw new Error("Armatura di chiave non supportata");
	}

	addNotes(notes, options = {}) {		
		if (!this.keySignature) this.addKeySignature("C", {});

		const noteSpacing = options.spacing || this.fontSize * 1.5;
		const xOffset = (options.xOffset + this.fontSize * 0.5) || this.fontSize * 0.5;
		const settingDuration = this.duration || "w";


		for (let i = 0; i < notes.length; i++) {
			const note = notes[i];
			const x = this.keySignatureXEnd + i * noteSpacing + xOffset;
			const {y, lines, beamDirection} = this.getAbsoluteY(note);
			let noteDuration = settingDuration;
			if (settingDuration === "mixed") noteDuration = ["w", "h", "q", "8"][Math.floor(Math.random() * 4)];

			this.notes[i] = {
				note: note,
				duration: noteDuration,
				x: x,
				y: y,
				lines: lines,
				beamDirection: beamDirection,
				accidental: note.length === 3 ? note[1] : null,
				color: "#000000"
			};
		}

		this.getMidiValues();
		this.formatAccidentals();
	}



	//============//
	// FORMATTERS //
	//============//

	//altezza relativa alla canvas
	getAbsoluteY(note) {
		const okt = parseInt(note[note.length - 1]);
		
		let pitch;

		switch(note[0]) {
			case "c": pitch = 10; break;
			case "d": pitch = 9; break;
			case "e": pitch = 8; break;
			case "f": pitch = 7; break;
			case "g": pitch = 6; break;
			case "a": pitch = 5; break;
			case "b": pitch = 4; break;
		}

		const spacing = this.lineSpacing * 0.5;
		const yOffset = this.clef == "\ue050" ? 0 : -12;
		const y = pitch - (okt - 4) * 7 + yOffset;

		let lines = 0;
		
		if (y >= 10) lines = -Math.floor(y / 2) + 4;
		else if (y <= -2) lines = -Math.floor((y + 1) / 2);

		let beamDirection = 1;

		if (y < 5) beamDirection = -1;

		return {
			y: y * spacing + this.yStave, 
			lines: lines,
			beamDirection: beamDirection
		};
	}

	formatAccidentals() {
		const sharps = ["f", "c", "g", "d", "a", "e", "b"];
		const flats = ["b", "e", "a", "d", "g", "c", "f"];
		const accidentalNumber = this.keySignatureCoords.length;
		const type = this.keySignatureCoords[0] >= 0 ? "#" : "b";
		const otherType = type === "#" ? "b" : "#";
		const pool = type === "#" ? sharps : flats;

		let accidentalNotes = [];

		for (let i = 0; i < accidentalNumber; i++) {
			accidentalNotes.push(pool[i]);
		}

		noteCicle:
		for (let i = 0; i < this.notes.length; i++) {
			const note = this.notes[i].note[0];
			const acc = this.notes[i].note[1];

			accidentalCicle:
			for (const accNote of accidentalNotes) {
				if (note === accNote) {
					if (acc === type) {
						this.notes[i].accidental = null;
					} else if (acc !== otherType) {
						this.notes[i].accidental = "h";
					}
 
					break accidentalCicle;
				}
			}
		}

		noteCicle:
		for (let i = 1; i < this.notes.length; i++) {
			const note = this.notes[i].note;
			
			prevCicle:
			for (let j = i - 1; j >= 0; j--) {
				const prevNote = this.notes[j].note;

				if (note[0] === prevNote[0] && note[note.length - 1] === prevNote[prevNote.length - 1]) {
					if (this.midiNotes[i] === this.midiNotes[j]) {
						this.notes[i].accidental = null;
					} else if (note[1] !== "#" && note[1] !== "b") {
						this.notes[i].accidental = "h";
					} else {
						this.notes[i].accidental = note[1];
					}

					break prevCicle;
				}
			}
		}		
	}



	//==========//
	// GRAPHICS //
	//==========//


	drawReference(x, y) {
		this.ctx.fillRect(x - 5, y - 5, 10, 10);
	}

	setColorStyle() {
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#000000";
	}

	drawStave() {
		if (!this.stave) return false;

		for (let i = 0; i < 5; i++) {
			const y = this.yStave + i * this.lineSpacing + 0.5;

			this.ctx.beginPath();
			this.ctx.moveTo(this.xStave, y);
			this.ctx.lineTo(this.xStave + this.wStave, y);
			this.ctx.stroke();
		}
		
		return true;
	}

	drawClef() {
		if (!this.clef) return false;

		this.ctx.fillText(this.clef, this.xClef, this.yClef);

		return true;
	}

	drawKeySignature() {
		const ksLen = this.keySignatureCoords.length;
		
		this.ctx.font = this.keySignatureFontSize + "px Bravura";

		for (let i = 0; i < ksLen; i++) {
			const accidental = this.keySignatureCoords[i];
			const accidentalGlyph = accidental >= 0 ? "\ue262" : "\ue260";

			const yOffset = this.clef === "\ue050" ? 0 : this.lineSpacing; 

			const x = this.keySignatureXOffset + i * this.keySignatureSpacing;
			const y = this.yStave + (Math.abs(accidental) - 1) * this.lineSpacing * 0.5 + yOffset;

			this.ctx.fillText(accidentalGlyph, x, y);
		}

		this.ctx.font = this.fontSize + "px Bravura";
	}

	drawNotes() {
		for (let note of this.notes) {
			if (note.note === "m") continue;

			this.ctx.fillStyle = note.color;

			let x = note.x;
			const lines = note.lines;

			if (lines < 0) {
				for (let j = 0; j < -lines; j++) {
					const y = this.yStave + (5 + j) * this.lineSpacing - 1;

					this.ctx.fillRect(x - this.fontSize * 0.35, y, this.fontSize * 0.7, 2);
				}
			} else if (lines > 0) {
				for (let j = 0; j < lines; j++) {
					const y = this.yStave + (-1 - j) * this.lineSpacing - 1;

					this.ctx.fillRect(x - this.fontSize * 0.35, y, this.fontSize * 0.7, 2);
				}
			}
			
			//https://fontsource.org/fonts/bravura/glyphs
			
			//const noteGlyphs = ["\ue0a2", "\ue0a3", "\ue0a4"];
			const noteGlyphs = ["\ue1d2", "\ue1d2", "\ue1d3", "\ue1d4", "\ue1d5", "\ue1d6", "\ue1d7", "\ue1d8"];
			const beamDirection = note.beamDirection;
			let glyphIndex = -1;

			switch(note.duration) {
				case "w": glyphIndex = 0; break;
				case "h": glyphIndex = 2; break;
				case "q": glyphIndex = 4; break;
				case "8": glyphIndex = 6; break;
			}

			glyphIndex += (1 - beamDirection) / 2;
			
			const glyph = noteGlyphs[glyphIndex];

			let glyphXOffset = 0;

			if (glyphIndex >= 6 && beamDirection > 0) {
				glyphXOffset = this.ctx.measureText(glyph).width * 0.22;
			}
		
			this.ctx.fillText(noteGlyphs[glyphIndex], x + glyphXOffset, note.y);

			//accidenti
			if (note.accidental) {
				let accidental = "\ue262"; //diesis
				
				switch(note.accidental) {
					case "b": accidental = "\ue260"; break;
					case "h": accidental = "\ue261"; break;
				}

				const accidentalOffset = lines === 0 ? 0.4 : 0.5;

				this.ctx.fillText(accidental, x - this.fontSize * accidentalOffset, note.y);
			}
		}
	}


	draw() {
		this.setColorStyle();

		if (!this.drawStave()) {
			throw new Error("lo Score non presenta alcuno Stave");
			return;
		}

		if (!this.drawClef()) {
			console.warn("Chiave non aggiunta allo Stave");
		}

		this.drawKeySignature();
		this.drawNotes();
	}
}

const KEY_SIGNATURE_COORDS = [
	[-5, -2, -6, -3, -7, -4, -8],
	[-5, -2, -6, -3, -7, -4],
	[-5, -2, -6, -3, -7],
	[-5, -2, -6, -3],
	[-5, -2, -6],
	[-5, -2],
	[-5],
	[],
	[1],
	[1, 4],
	[1, 4, 0],
	[1, 4, 0, 3],
	[1, 4, 0, 3, 6],
	[1, 4, 0, 3, 6, 2],
	[1, 4, 0, 3, 6, 2, 5]
];

const KEY_SIGNATURE_SET = {
	"Cb": ["b", "e", "a", "d", "g", "c", "f"],
	"Gb": ["b", "e", "a", "d", "g", "c"],
	"Db": ["b", "e", "a", "d", "g"],
	"Ab": ["b", "e", "a", "d"],
	"Eb": ["b", "e", "a"],
	"Bb": ["b", "e"],
	"F": ["b"],
	"C": [],
	"G": ["f"],
	"D": ["f", "c"],
	"A": ["f", "c", "g"],
	"E": ["f", "c", "g", "d"],
	"B": ["f", "c", "g", "d", "a"],
	"F#": ["f", "c", "g", "d", "a", "e"], 
	"C#": ["f", "c", "g", "d", "a", "e", "b"],
}