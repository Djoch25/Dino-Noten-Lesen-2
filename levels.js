const levels = [];
const levelColors = ["#00ff00", "#ffff00", "#aaaaff"];

const getNoteSet = (level, tonality) => {
	const category = level.category;
	const type = level.type;
	
	if (category === "arcadia") {
		if (level.noteSets) return level.noteSets[Math.floor(Math.random() * 8)];
		else if (level.tonality) return getTonalityNoteSet(level, tonality);
		else return getRangeNoteSet(level);
	} else if (category === "training") {
		switch(type) {
			case "hand-position": return getHandPositionNoteSet(level);
			case "range": return getRangeNoteSet(level);
			case "tonality": return getTonalityNoteSet(level);
			case "interval": return getIntervalNoteSet(level);
		}
	} else {
		throw new Error("Categoria di gioco non riconosciuta");
	}
}

//VA CREATA UNA LOGICA ARMONICA TRA DESTRA E SINISTRA
const getHandPositionNoteSet = (level) => {
	const range1 = level.ranges[0];
	const range2 = level.ranges[1] || null;

	const pool1 = [];
	const pool2 = [];
	const notes1 = [];
	const notes2 = [];

	for (let i = 0; i < 5; i++) {
		const firstNote = range1[0];

		pool1[i] = Score.shiftNote(firstNote, i);
	}

	for (let i = 0; i < 8; i++) {
		notes1.push(pool1[Math.floor(Math.random() * pool1.length)]);
	}

	if (range2) {
		for (let i = 0; i < 5; i++) {
			const firstNote = range2[0];

			pool2[i] = Score.shiftNote(firstNote, i);
		}

		for (let i = 0; i < 8; i++) {
			notes2.push(pool2[Math.floor(Math.random() * pool2.length)]);
		}
	}

	return {notes1, notes2};
}

const getRangeNoteSet = (level) => {
	const range1 = level.ranges[0];
	const range2 = level.ranges[1] || null;

	const interval1 = Score.getInterval(range1[0], range1[1]) + 1;
	const interval2 = range2 ? Score.getInterval(range2[0], range2[1]) + 1 : null;

	const pool1 = [];
	const pool2 = [];
	const notes1 = [];
	const notes2 = [];

	let accidental = level.accidental === "none" ? null : level.accidental;

	for (let i = 0; i < interval1; i++) {
		pool1[i] = Score.shiftNote(range1[0], i);
	}

	for (let i = 0; i < 8; i++) {
		notes1.push(pool1[Math.floor(Math.random() * pool1.length)]);

		if (accidental === "mixed") {
			if (Math.random() < 0.5) accidental = "#";
			else accidental = "b";
		}

		if ((accidental === "b" && notes1[i][0] !== "c" && notes1[i][0] !== "f") ||
			(accidental === "#" && notes1[i][0] !== "e" && notes1[i][0] !== "b")) {
			if (Math.random() < 0.33) {
				notes1[i] = notes1[i][0] + accidental + notes1[i][1];
			}
		}
	}


	if (range2) {
		for (let i = 0; i < interval2; i++) {
			pool2[i] = Score.shiftNote(range2[0], i);
		}

		for (let i = 0; i < 8; i++) {
			notes2.push(pool2[Math.floor(Math.random() * pool2.length)]);

			if (accidental === "mixed") {
				if (Math.random() < 0.5) accidental = "#";
				else accidental = "b";
			}

			if ((accidental === "b" && notes2[i][0] !== "c" && notes2[i][0] !== "f") ||
				(accidental === "#" && notes2[i][0] !== "e" && notes2[i][0] !== "b")) {
				if (Math.random() < 0.33) {
					notes2[i] = notes2[i][0] + accidental + notes2[i][1];
				}
			}
		}
	}

	return {notes1, notes2};
}

const getTonalityNoteSet = (level, passedInTonality) => {
	const range1 = level.ranges[0];
	const range2 = level.ranges[1] || null;

	const pool1 = [];
	const pool2 = [];
	const notes1 = [];
	const notes2 = [];

	let tonality = passedInTonality || level.tonality;

	const keySignatureSet = KEY_SIGNATURE_SET[tonality];
	const accidental = keySignatureSet[0] === "f" ? "#" : "b";

	for (let i = 0; i < 8; i++) {
		const firstNote = range1[0];

		pool1[i] = Score.shiftNote(firstNote, i);
	}

	for (let i = 0; i < 8; i++) {
		notes1.push(pool1[Math.floor(Math.random() * pool1.length)]);

		for (let j = 0; j < keySignatureSet.length; j++) {
			if (notes1[i][0] === keySignatureSet[j]) {
				notes1[i] = notes1[i][0] + accidental + notes1[i][notes1[i].length - 1]; 
			}
		}
	}

	if (range2) {
		for (let i = 0; i < 8; i++) {
			const firstNote = range2[0];

			pool2[i] = Score.shiftNote(firstNote, i);
		}

		for (let i = 0; i < 8; i++) {
			notes2.push(pool2[Math.floor(Math.random() * pool2.length)]);

			for (let j = 0; j < keySignatureSet.length; j++) {
				if (notes2[i][0] === keySignatureSet[j]) {
					notes2[i] = notes2[i][0] + accidental + notes2[i][notes2[i].length - 1]; 
				}
			}
		}
	}

	return {notes1, notes2};
}

const getIntervalNoteSet = (level) => {
	const range1 = level.ranges[0];
	const range2 = level.ranges[1] || null;

	const pool1 = [];
	const pool2 = [];

	const notes1 = [];
	const notes2 = [];

	for (let i = 0; i < 8; i++) {
		const firstNote = range1[0];
		pool1.push(Score.shiftNote(firstNote, i));
	}

	notes1[0] =	pool1[Math.floor(Math.random() * pool1.length)];

	for (let i = 1; i < 8; i++) {
		let interval = 1;

		if (Math.random() > 0.33) {
			interval = level.interval;
		}

		if (Math.random() > 0.5) {
			interval *= -1;
		}

		notes1[i] = Score.shiftNote(notes1[i - 1], interval);
	}

	if (range2) {
		for (let i = 0; i < 8; i++) {
			const firstNote = range2[0];
			pool2.push(Score.shiftNote(firstNote, i));
		}

		notes2[0] =	pool2[Math.floor(Math.random() * pool2.length)];

		for (let i = 1; i < 8; i++) {
			let interval = 1;

			if (Math.random() > 0.33) {
				interval = level.interval;
			}

			if (Math.random() > 0.5) {
				interval *= -1;
			}

			notes2[i] = Score.shiftNote(notes2[i - 1], interval);
		}
	}

	return {notes1, notes2};
}

const prepareLevelForArcadia = (level, levelIndex) => {
	const nextLevel = arcadiaLevels[levelIndex];

	level.clear();

	level.category = "arcadia";
	level.level = levelIndex;
	level.staveNumber = nextLevel.staveNumber;
	level.clefs = nextLevel.clefs;
	level.ranges = nextLevel.ranges;
	level.noteSets = nextLevel.noteSets;
	level.accidental = nextLevel.accidental;
	level.tonality = nextLevel.tonality;
	level.tileSet = nextLevel.tileSet;
}


const passwords = [
	"ALPAKA", //2
	"BARRAKUDA", //3
	"CHAMELEON", //4
	"DROMEDAR", //5
	"EIDECHSE", //6
	"FAULTIER",//7
	"GORILLA", //8
	"HIRSCH", //9
	"ILTIS", //10
	"JAGUAR", //11
	"KANGURU", //12
	"LIBELLE", //13
	"MAKAKO", //14
	"NACHTIGALL",//15 
	"OKTOPUS", //16
	"PELIKAN", //17
	"QUOKKA", //18
	"RHINOZEROS", //19 
	"SCHMETTERLING", //20
	"TRUTHAHN", //21
	"VAMPIR", //22
	"WALROSS", //23
	"XENOPUS", //24
	"ZIKADE" //25
];