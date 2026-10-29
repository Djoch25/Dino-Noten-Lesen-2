const noteSets = [];

noteSets[0] = null;
noteSets[1] = null;

noteSets[2] = [];

for (let i = 0; i < 8; i++) {
	const notes1 = [];
	const notePool = ["c3", "f3", "g3"];

	for (let j = 0; j < 8; j++) {
		notes1.push(notePool[Math.floor(Math.random() * 3)]);
	}

	noteSets[2][i] = {
		notes1: notes1,
		notes2: []
	}
}

noteSets[3] = null;

noteSets[4] = [
	{
		notes1: ["c4", "c4", "e4", "e4", "e4", "d4", "c4", "c4"], 
		notes2: ["c3", "c3", "c3", "c3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["c4", "c4", "c4", "d4", "e4", "e4", "e4", "d4"], 
		notes2: ["c3", "c3", "f3", "f3", "g3", "c3", "f3", "f3"]
	},
	{
		notes1: ["c4", "d4", "e4", "c4", "c4", "d4", "e4", "c4"], 
		notes2: ["c3", "g3", "c3", "c3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["e4", "c4", "d4", "e4", "e4", "d4", "e4", "c4"], 
		notes2: ["c3", "f3", "g3", "c3", "f3", "g3", "c3", "c3"]
	},
	{
		notes1: ["c4", "d4", "d4", "e4", "e4", "d4", "e4", "c4"], 
		notes2: ["c3", "f3", "g3", "g3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["e4", "e4", "d4", "e4", "c4", "d4", "e4", "e4"], 
		notes2: ["c3", "c3", "g3", "c3", "f3", "f3", "c3", "c3"]
	},
	{
		notes1: ["d4", "e4", "c4", "d4", "c4", "e4", "d4", "c4"], 
		notes2: ["g3", "g3", "g3", "g3", "c3", "c3", "g3", "c3"]
	},
	{
		notes1: ["c4", "c4", "c4", "d4", "e4", "e4", "e4", "d4"], 
		notes2: ["c3", "c3", "f3", "f3", "g3", "c3", "f3", "f3"]
	}
];

noteSets[5] = [
	{
		notes1: ["c4", "c4", "e4", "e4", "e4", "d4", "c4", "c4"], 
		notes2: ["c3", "c3", "c3", "c3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["c4", "c4", "c4", "d4", "e4", "e4", "e4", "d4"], 
		notes2: ["c3", "c3", "f3", "f3", "g3", "c3", "f3", "f3"]
	},
	{
		notes1: ["c4", "d4", "e4", "c4", "c4", "d4", "e4", "c4"], 
		notes2: ["c3", "g3", "c3", "c3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["e4", "c4", "d4", "e4", "e4", "d4", "e4", "c4"], 
		notes2: ["c3", "f3", "g3", "c3", "f3", "g3", "c3", "c3"]
	},
	{
		notes1: ["c4", "d4", "d4", "e4", "e4", "d4", "e4", "c4"], 
		notes2: ["c3", "f3", "g3", "g3", "c3", "g3", "c3", "c3"]
	},
	{
		notes1: ["e4", "e4", "d4", "e4", "c4", "d4", "e4", "e4"], 
		notes2: ["c3", "c3", "g3", "c3", "f3", "f3", "c3", "c3"]
	},
	{
		notes1: ["d4", "e4", "c4", "d4", "c4", "e4", "d4", "c4"], 
		notes2: ["g3", "g3", "g3", "g3", "c3", "c3", "g3", "c3"]
	},
	{
		notes1: ["c4", "c4", "c4", "d4", "e4", "e4", "e4", "d4"], 
		notes2: ["c3", "c3", "f3", "f3", "g3", "c3", "f3", "f3"]
	}
];

noteSets[6] = null;
noteSets[7] = null;

noteSets[8] = [
	{
		notes1: ["e4", "e4", "f4", "f4", "g4", "f4", "g4", "g4"], 
		notes2: ["c3", "c3", "d3", "d3", "c3", "d3", "e3", "e3"]
	},
	{
		notes1: ["f4", "g4", "f4", "f4", "f4", "e4", "d4", "c4"], 
		notes2: ["d3", "e3", "f3", "d3", "d3", "e3", "f3", "e3"]
	},
	{
		notes1: ["c4", "g4", "c4", "d4", "f4", "d4", "g4", "c4"], 
		notes2: ["e3", "e3", "e3", "d3", "f3", "f3", "f3", "e3"]
	},
	{
		notes1: ["d4", "c4", "e4", "d4", "g4", "f4", "e4", "c4"], 
		notes2: ["g3", "e3", "c3", "d3", "e3", "f3", "e3", "c3"]
	},
	{
		notes1: ["d4", "e4", "f4", "e4", "d4", "e4", "c4", "f4"], 
		notes2: ["g3", "g3", "g3", "c3", "f3", "e3", "e3", "d3"]
	},
	{
		notes1: ["c4", "d4", "e4", "f4", "g4", "f4", "e4", "d4"], 
		notes2: ["c3", "d3", "e3", "f3", "g3", "f3", "e3", "d3"]
	},
	{
		notes1: ["c4", "g4", "e4", "g4", "f4", "d4", "g4", "e4"], 
		notes2: ["c3", "e3", "g3", "e3", "f3", "g3", "e3", "c3"]
	},
	{
		notes1: ["c4", "c4", "d4", "d4", "e4", "f4", "d4", "g4"], 
		notes2: ["f3", "e3", "g3", "f3", "e3", "d3", "f3", "e3"]
	}
];

noteSets[9] = null;
noteSets[10] = null;

noteSets[11] = [
	{
		notes1: ["c4", "c4", "g4", "g4", "a4", "f4", "g4", "e4"], 
		notes2: ["c3", "c3", "e3", "e3", "f3", "f3", "g3", "g3"]
	},
	{
		notes1: ["f4", "a4", "g4", "e4", "d4", "g4", "g4", "c4"], 
		notes2: ["f3", "f3", "e3", "c3", "g3", "g3", "c3", "c3"]
	},
	{
		notes1: ["c4", "c5", "b4", "a4", "b4", "c5", "g4", "e4"], 
		notes2: ["f3", "e3", "d3", "f3", "e3", "c3", "e3", "c3"]
	},
	{
		notes1: ["f4", "a4", "g4", "e4", "f4", "d4", "g4", "g4"], 
		notes2: ["d3", "f3", "e3", "g3", "f3", "f3", "e3", "e3"]
	},
	{
		notes1: ["a4", "f4", "g4", "a4", "b4", "g4", "a4", "b4"], 
		notes2: ["f3", "f3", "e3", "c3", "d3", "e3", "f3", "g3"]
	},
	{
		notes1: ["c5", "c4", "b4", "a4", "g4", "c4", "f4", "e4"], 
		notes2: ["f3", "e3", "g3", "f3", "e3", "f3", "d3", "c3"]
	},
	{
		notes1: ["d4", "c4", "d4", "e4", "f4", "d4", "g4", "f4"], 
		notes2: ["g3", "c3", "d3", "e3", "f3", "g3", "e3", "d3"]
	},
	{
		notes1: ["e4", "c5", "f4", "c5", "g4", "c5", "a4", "c5"], 
		notes2: ["c3", "e3", "d3", "f3", "e3", "g3", "f3", "e3"]
	}
];

noteSets[12] = null;
noteSets[13] = null;

noteSets[14] = [
	{
		notes1: ["c4", "e4", "g4", "e4", "f4", "a4", "c5", "a4"], 
		notes2: ["c3", "e3", "g3", "e3", "f3", "a3", "c4", "a3"]
	},
	{
		notes1: ["g4", "e4", "f4", "d4", "e4", "c4", "d4", "g4"], 
		notes2: ["b3", "g3", "a3", "f3", "g3", "e3", "f3", "e3"]
	},
	{
		notes1: ["f4", "a4", "c5", "c4", "c4", "a4", "g4", "f4"], 
		notes2: ["d3", "d3", "e3", "e3", "f3", "f3", "g3", "g3"]
	},
	{
		notes1: ["e4", "g4", "f4", "e4", "d4", "f4", "e4", "d4"], 
		notes2: ["c3", "e3", "a3", "a3", "b3", "b3", "c4", "b3"]
	},
	{
		notes1: ["c4", "c5", "c5", "g4", "a4", "c5", "c5", "a4"], 
		notes2: ["a3", "g3", "f3", "e3", "d3", "c3", "f3", "f3"]
	},
	{
		notes1: ["g4", "a4", "a4", "e4", "f4", "g4", "e4", "d4"], 
		notes2: ["e3", "f3", "d3", "e3", "d3", "e3", "c3", "g3"]
	},
	{
		notes1: ["c4", "e4", "f4", "g4", "a4", "f4", "g4", "a4"], 
		notes2: ["a3", "a3", "a3", "g3", "f3", "f3", "e3", "d3"]
	},
	{
		notes1: ["b4", "g4", "a4", "b4", "c5", "c4", "e4", "c4"], 
		notes2: ["g3", "g3", "f3", "f3", "e3", "e3", "c3", "c3"]
	}
];

noteSets[15] = null;
noteSets[16] = null;
noteSets[17] = null;
noteSets[18] = null;
noteSets[19] = null;
noteSets[20] = null;

noteSets[21] = [
	{
		notes1: ["d4", "bb4", "a4", "g4", "a4", "d4", "g4", "f4"], 
		notes2: ["g3", "g3", "f#3", "g3", "d3", "d3", "e4", "f3"]
	},
	{
		notes1: ["e4", "f4", "d4", "f4", "e4", "eb4", "d4", "d4"], 
		notes2: ["c3", "d3", "bb3", "a3", "g3", "g3", "f#3", "f3"]
	},
	{
		notes1: ["c4", "g4", "f#4", "g4", "a4", "f#4", "g4", "a4"], 
		notes2: ["e3", "e3", "d3", "d3", "d3", "d3", "e3", "f#3"]
	},
	{
		notes1: ["bb4", "c4", "eb4", "g4", "bb4", "a4", "g4", "bb4"], 
		notes2: ["g3", "eb3", "c3", "eb3", "g3", "f3", "e3", "d3"]
	},
	{
		notes1: ["a4", "c5", "f4", "a4", "g#4", "b4", "e4", "g4"], 
		notes2: ["c3", "c3", "d3", "d3", "e3", "e3", "c3", "c#3"]
	},
	{
		notes1: ["f4", "a4", "g4", "f4", "e4", "d#4", "e4", "f#4"], 
		notes2: ["d3", "d3", "e3", "f3", "g3", "b3", "g3", "f#3"]
	},
	{
		notes1: ["g4", "e4", "g4", "a4", "b4", "g4", "bb4", "a4"], 
		notes2: ["e3", "e3", "e3", "d3", "g3", "e3", "g3", "a3"]
	},
	{
		notes1: ["a4", "c5", "b4", "a4", "g4", "bb4", "a4", "g4"], 
		notes2: ["d3", "e3", "f3", "f3", "e3", "d3", "c#3", "c#3"]
	}
];

noteSets[22] = null;
noteSets[23] = null;

noteSets[24] = [
	{
		notes1: ["f4", "c4", "f4", "a4", "g4", "a4", "bb4", "g4"], 
		notes2: ["f3", "f3", "f3", "f3", "c3", "f3", "d3", "e3"],
		tonality: "F"
	},
	{
		notes1: ["f#4", "g4", "a4", "f#4", "d#4", "e4", "f#4", "g4"], 
		notes2: ["d#3", "e3", "f#3", "f#3", "f#3", "c4", "b3", "e3"],
		tonality: "G"
	},
	{
		notes1: ["e4", "a4", "a4", "f#4", "g4", "e4", "f#4", "d4"], 
		notes2: ["c#4", "a3", "f#3", "d3", "e3", "c#3", "d3", "f#3"],
		tonality: "D"
	},
	{
		notes1: ["e4", "g4", "g4", "f#4", "g4", "b4", "b4", "a4"], 
		notes2: ["g3", "e3", "c3", "d3", "e3", "e3", "e3", "d3"],
		tonality: "G"
	},
	{
		notes1: ["c5", "c5", "bb4", "a4", "bb4", "f4", "d4", "f4"], 
		notes2: ["f3", "eb3", "d3", "c3", "d3", "d3", "d3", "d3"],
		tonality: "Bb"
	},
	{
		notes1: ["g4", "e4", "g4", "a4", "bb4", "a4", "g4", "f4"], 
		notes2: ["g3", "g3", "g3", "f3", "e3", "c#3", "c#3", "d3"],
		tonality: "F"
	},
	{
		notes1: ["b4", "a4", "g4", "f#4", "e4", "g4", "f#4", "e4"], 
		notes2: ["g3", "c#3", "e3", "d3", "c#3", "a3", "b3", "a3"],
		tonality: "D"
	},
	{
		notes1: ["d4", "a4", "bb4", "g4", "eb4", "g4", "f#4", "g4"], 
		notes2: ["g3", "f#3", "g3", "eb3", "c3", "eb3", "d3", "g3"],
		tonality: "Bb"
	}
];


const arcadiaLevels = [];

arcadiaLevels[0] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "e4"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[1] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "g4"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[2] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: null,
	noteSets: noteSets[2],
	accidental: null,
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[3] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c3", "g3"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[4] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[4],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[5] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[5],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[6] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c5"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[7] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c3", "c4"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[8] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[8],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[9] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "g5"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[10] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["f2", "c4"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[11] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[11],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[12] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c6"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[13] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c2", "c4"]],
	noteSets: null,
	accidental: null,
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[14] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[14],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[15] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c5"]],
	noteSets: null,
	accidental: "#",
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[16] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c3", "c4"]],
	noteSets: null,
	accidental: "#",
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[17] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c5"]],
	noteSets: null,
	accidental: "b",
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[18] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c3", "c4"]],
	noteSets: null,
	accidental: "b",
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[19] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c6"]],
	noteSets: null,
	accidental: "mixed",
	tonality: null,
	tileSet: freeTileSet
};

arcadiaLevels[20] = {
	staveNumber: 1,
	clefs: ["bass"],
	ranges: [["c2", "c4"]],
	noteSets: null,
	accidental: "mixed",
	tonality: null,
	tileSet: desertTileSet
};

arcadiaLevels[21] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[21],
	accidental: null,
	tonality: null,
	tileSet: winterTileSet
};

arcadiaLevels[22] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c6"]],
	noteSets: null,
	accidental: null,
	tonality: ["G", "D"],
	tileSet: freeTileSet
};

arcadiaLevels[23] = {
	staveNumber: 1,
	clefs: ["treble"],
	ranges: [["c4", "c6"]],
	noteSets: null,
	accidental: null,
	tonality: ["G", "D", "F", "Bb"],
	tileSet: freeTileSet
};

arcadiaLevels[24] = {
	staveNumber: 2,
	clefs: ["treble", "bass"],
	ranges: null,
	noteSets: noteSets[24],
	accidental: null,
	tonality: ["G", "D", "F", "Bb"],
	tileSet: winterTileSet
};