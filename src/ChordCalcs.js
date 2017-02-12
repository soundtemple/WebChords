import _ from "underscore";

const allModes = {
    major :   { "name" : "Major",
                "pattern" : [0,2,4,5,7,9,11,12],
                "notation" : ['I','ii','iii','IV','V','vi','viio','I']
              },
    natMin:   { "name" : "Natural Minor",
                "pattern" : [0,2,3,5,7,8,10,12],
                "notation" : ['i','iio','III','iv','v','VI','VII','i']
              },
    harmin:   { "name" : "Harmonic Minor",
                "pattern" : [0,2,3,5,7,8,11,12],
                "notation" : ['i', 'iio', 'III+', 'iv',	'V', 'VI', 'viio', 'i']
              },
    melmin:   { "name" : "Melodic Minor",
                "pattern" : [0,2,3,5,7,9,11,12],
                "notation" : ['i',	'ii',	'III',	'iv',	'v', 'vio',	'VII', 'i']
              },
    dorian:   { "name" : "Dorian",
                "pattern" : [0,2,3,5,7,9,10,12],
                "notation" : ['i', 'ii',	'III',	'IV',	'v',	'vio',	'VII','i']
              },
    mixolyd:  { "name" : "Mixolydian",
                "pattern" : [0,2,4,5,7,9,10,12],
                "notation" : ['I',	'ii',	'iiio',	'IV',	'v',	'vi',	'VII', 'i']
              },
    lydian:   { "name" : "Lydian",
                "pattern" : [0,2,4,6,7,9,11,12],
                "notation" : ['I',	'II',	'iii',	'ivo',	'V',	'vi',	'vii', 'i']
              },
    phrygian: { "name" : "Phrygian",
                "pattern" : [0,1,3,5,7,8,10,12],
                "notation" : ['i',	'II',	'III',	'iv',	'vo',	'VI',	'vii', 'i']
              },
    locrian:   { "name" : "Locrian",
                "pattern" : [0,1,3,4,7,8,10,12],
                "notation" : ['io',	'II',	'iii',	'iv',	'V',	'VI',	'vii', 'i']
              },
    hybrid:   { "name" : "Hybrid Minor",
                "pattern" : [0,2,3,5,7,8,11,12],
                "notation" : ['i',	'iio', 	'III+',	'iv',	'V',	'VI',	'viio', 'i']
              }
    },
    oneOctave = 12,
    intervals = {
      "0" : "Unison",
      "1" : "m2",
      "2" : "M2",
      "3" : "m3",
      "4" : "M3",
      "5" : "P4",
      "6" : "TT",
      "7" : "P5",
      "8" : "m6",
      "9" : "M6",
      "10" : "m7",
      "11" : "M7",
      "12" : "Oct"
    },
    chordCodes = {
      "25" : "Sus2",
      "55" : "Stacked P4's",
      "52" : "Sus4",
      "16" : "Sus2",
      "15" : "Sus2",
      "65" : "Stacked 4ths",
      "51" : "Sus4",
      "56" : "Stacked 4ths",
      "61" : "Sus4",
      // 7th sus2 tetrads
      "254" : "Sus?",
      "541" : "Sus?",
      "412" : "Sus?",
      "125" : "Sus?",
      "225" : "Sus?",
      "253" : "Sus?",
      "532" : "Sus?",
      "322" : "Sus?",
      "216" : "Sus?",
      "163" : "Sus?",
      "632" : "Sus?",
      "542" : "Sus?",
      "421" : "Sus?",
      "215" : "Sus?",
      "154" : "Sus?",
      // sus4 tetrads
      "524" : "Sus4?",
      "241" : "Sus4?",
      "415" : "Sus4?",
      "152" : "Sus4?",
      "252" : "Sus4?",
      "523" : "Sus4?",
      "232" : "Sus4?",
      "325" : "Sus4?",
      "416" : "Sus4?",
      "161" : "Sus4?",
      "614" : "Sus4?",
      "141" : "Sus4?",
      "142" : "Sus4?",
      "425" : "Sus4?",
      "251" : "Sus4?",
      "514" : "Sus4?",
      // 7th chords
      "433": "Dom.",
      "332": "Dom.",
      "324": "Dom.",
      "243": "Dom.",
      // add 9 chords
      "205": "Major",
    }



var midiNotesList = {},
    scalePattern = [0,2,4,5,7,9,11,12],
    chordScaleDegs = [],
    chordMidiNums = [],
    rootNote = 48,
    scaleNoteLetters = [],
    scaleNotesStripOctave = [],
    chordLettersStrip = [],
    scaleSynthData = [],
    chordFreqs = [],
    chordNoteLetters = [],
    noteInfo = {},
    chordInversion = 0,
    chordIntervals = []


// creates array of all midi note numbers and corresponding note letters.
function getAllNotes() {
  var oct = -2
  for (var note=0; note<=128; note+=12) {
    noteInfo['' + (note)] = ['C' + oct, 'C' + oct],
    noteInfo['' + (note + 1)] = ['C#' + oct, 'Db' + oct],
    noteInfo['' + (note + 2)] = ['D' + oct, 'D' + oct],
    noteInfo['' + (note + 3)] = ['D#' + oct, 'Eb' + oct],
    noteInfo['' + (note + 4)] = ['E' + oct, 'E' + oct],
    noteInfo['' + (note + 5)] = ['F' + oct, 'F' + oct],
    noteInfo['' + (note + 6)] = ['F#' + oct, 'Gb' + oct],
    noteInfo['' + (note + 7)] = ['G' + oct, 'G' + oct],
    noteInfo['' + (note + 8)] = ['G#' + oct, 'Ab' + oct],
    noteInfo['' + (note + 9)] = ['A' + oct, 'A' + oct],
    noteInfo['' + (note + 10)] = ['A#' + oct, 'Bb' + oct],
    noteInfo['' + (note + 11)] = ['B' + oct, 'B' + oct],
    noteInfo['' + (note + 12)] = ['C' + oct, 'C' + oct];
    oct+=1;
  }
  return midiNotesList = noteInfo;
};

getAllNotes();

//returns all scale modes to app component
function getAllModes() {
  return allModes
};

// returns currently selected root note MIDI VAL (base 48 - C2) to app component
function getRootNote() {
  return rootNote
};

//Updates rootNote midi value
function setKey(newKey) {
  rootNote = parseInt(newKey);
  return rootNote
}

// returns scale note names for selected Mode in specified # or b
function getScaleNotes(selectedMode, sharpFlatToggle) {
  scaleNoteLetters = []; //reset array
  var dispSharps = 0;
  if (!sharpFlatToggle) {
    dispSharps = 1;
  }
  selectedMode.pattern.forEach(function (elem, index){
    scaleNoteLetters[index] = midiNotesList[elem + rootNote][dispSharps];
  });
  octaveStrip(scaleNoteLetters);
  return scaleNoteLetters
};

//removes octave from scale note
function octaveStrip(notes){
  scaleNotesStripOctave = [];
  notes.forEach(function(note, index){
    scaleNotesStripOctave[index] = note.substring(0, note.length - 1);
  });
  console.log('octave strip= '+scaleNotesStripOctave);
  return scaleNotesStripOctave;
}

// returns notes played by each scale pad
function getScaleSynthData(selectedMode, octToggle, sharpFlatToggle) {
  var orderScalePads = [0,3,6,1,4,7,2,5,9,12,15,10,13,16,11,14]
  scaleSynthData = []; // reset array
  scaleSynthData[8] = "PENT";
  scaleSynthData[17] = "OCT+/-";
  var dispSharps = 0;
  if (!sharpFlatToggle) {
    dispSharps = 1;
  }
  selectedMode.pattern.forEach(function (elem, index){
    var OctaveAdj = 0;
    if (octToggle) {
      OctaveAdj = 12;
    };
    scaleSynthData[orderScalePads[index]] = midiNotesList[elem + rootNote + OctaveAdj ][dispSharps];
    scaleSynthData[orderScalePads[index] + 9] = midiNotesList[elem + rootNote + oneOctave + OctaveAdj ][dispSharps];
  })
  return scaleSynthData
};

// on change updates selected scale and returns selected mode object to app component
function setScale(selectedScale) {
  var selectedMode = allModes[selectedScale];
  scalePattern = selectedMode.pattern;
  return selectedMode
}

// calculates which scale degrees will comprise chord
function getChordScaleDegs(btnNum, chordVariations, chordEmb) {
  var chordRoot = btnNum%8;
  var suspension = 0;
  chordScaleDegs = [];
  // suspended chord adj.
  if (chordVariations === 1) {
      suspension = -1;
  } else if (chordVariations === 2) {
    suspension = 1;
  }
  chordRoot+= 1;
  chordScaleDegs[0] = chordRoot;
  chordScaleDegs[1] = chordRoot + 2 + suspension;
  chordScaleDegs[2] = chordRoot + 4;
  // adj for 7th or Add9 chord
  if (chordEmb === 1) {
    chordScaleDegs[3] = chordRoot + 6; //6 semitones degrees to add 7th;
  };
  if (chordEmb === 2) {
    chordScaleDegs[3] = chordRoot + 1; //1 semitone degrees to add 9th or 2nd;
  };
  // adj so scale degrees in same octave.
  chordScaleDegs.forEach(function(item, index) {
    if (item > 7) {
      item-= 7;
      chordScaleDegs[index] = item;
    }
  });
  console.log('these are the scale degs...'+chordScaleDegs);
  return chordScaleDegs;
};

// calculates midi numbers for each note in chord
function getChordMidiNums(btnNum, chordScaleDegs) {
  var chordRow = parseInt(btnNum/8) // row determines inversion
  chordMidiNums = []; // reset array
  chordScaleDegs.forEach(function(item, index){
    chordMidiNums[index] = scalePattern[ chordScaleDegs[index] - 1 ] + rootNote;
    // adj for last column root up one octave.
    if (btnNum%8 === 7) {
      chordMidiNums[index]+= 12;
    }
  });
  // sort midi numbers so lowest notes are inverted
  chordMidiNums = chordMidiNums.sort();
  // inversions - based on row.
  switch(chordRow) {
    case 1:
        chordMidiNums[0] += oneOctave;
        break;
    case 2:
        chordMidiNums[0] += oneOctave;
        chordMidiNums[1] += oneOctave;
        break;
    case 3:
        chordMidiNums[0] += oneOctave;
        chordMidiNums[1] += oneOctave;
        chordMidiNums[2] += oneOctave;
        break;
    default:
        break;
  }

  return chordMidiNums.sort();
};

// reorder scale degrees based on inversion
function getOrderChordDegs(chordNoteLetters) {
  var orderChordDegs = [];
  chordLettersStrip = [];
  // remove octave naming
  chordNoteLetters.forEach(function(note, index){
    chordLettersStrip[index] = note.substring(0, note.length - 1);
  })
  chordLettersStrip.forEach(function(note, index){
    orderChordDegs[index] = scaleNotesStripOctave.indexOf(chordLettersStrip[index]) + 1;
  });
  console.log('this is the orderchord degs= ' + orderChordDegs);
  return orderChordDegs;
}

// calculates freq's in Hz for each note in chord.
function getChordFreqs(chordMidiNums) {
  chordFreqs = []; // reset array
  chordMidiNums.forEach(function(item, index){
    chordFreqs[index] = convertMidiToFreq(chordMidiNums[index]);
  });
  return chordFreqs;
};

// round frequencies for easy display
function getChordFreqInt(chordFreqs) {
  var chordFreqInt = []; //reset array
  chordFreqs.forEach(function(item, index){
    chordFreqInt[index] = parseInt(chordFreqs[index])
  });
  return chordFreqInt;
};

// formula to convert a note from midi to Freq
function convertMidiToFreq(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
};

// calc note letters for each note in chord given midi nums
function getChordNoteLetters(chordMidiNums, sharpFlatToggle) {
  chordNoteLetters = []; //reset array
  var dispSharps = 0;
  if (!sharpFlatToggle) {
    dispSharps = 1;
  }
  chordMidiNums.forEach(function(item, index){
    chordNoteLetters[index] = midiNotesList[chordMidiNums[index]][dispSharps];
  });
  console.log(chordNoteLetters);
  return chordNoteLetters;
};

// calculate chord name
function getChordName(btnNum, chordMidiNums, embel, suspended, scale) {
  console.log("embel=" + embel);
  var tetrad
  var chordName = '';
  var type = getChordType(chordMidiNums, btnNum, scale);
  var letter = scaleNotesStripOctave[btnNum%8];
  // suspended chords use lowest note for name
  if (suspended > 0) {
    var currChordNotes = ChordNoteLet();
    letter = currChordNotes[0];
  }
  switch(embel) {
    case 1:
        tetrad = '7th'
        break;
    case 2:
        tetrad = 'Add 9'
        break;
    default:
        tetrad = ''
}
  chordName = letter + ' ' + type + ' ' + tetrad;
  return chordName
};

// chord type maj min dim or aug
function getChordType(chordMidiNums, btnNum, scale) {
  var chordName = '';
  // get chord type based on scale degree and triad code in allModes object
  var chordOnDegree = btnNum%8;
  var chordRomNum = allModes[scale].notation[chordOnDegree];
  if (chordRomNum === chordRomNum.toLowerCase()) {
    chordName = 'Minor'
  }
  if (chordRomNum === chordRomNum.toUpperCase()) {
    chordName = 'Major'
  }
  if (chordRomNum.includes("o")) {
    chordName = 'Dim.'
  }
  if (chordRomNum.includes("+")) {
    chordName = 'Aug.'
  }
  // check for edge cases. based on specfic chord note intervals
  chordIntervals = [];
  // calc chord intervals
  chordIntervals[0] = chordMidiNums[1] - chordMidiNums[0];
  chordIntervals[1] = chordMidiNums[2] - chordMidiNums[1];
  if (chordMidiNums.length === 4) {
    chordIntervals[2] = chordMidiNums[3] - chordMidiNums[2];
  };
  console.log(chordIntervals);
  // get exception name from chordCodes table
  var chordException = chordCodes[chordIntervals.join('')]
  if (chordException !== undefined) {
    chordName = chordException
  }
  return chordName
};

// get inversion type
function getChordInversion(chordScaleDegs, orderChordDegs, suspended){
  console.log('suspended = ' + suspended);
  console.log('chordScaleDegs= ' + chordScaleDegs);
  console.log('orderChordDegs= ' + orderChordDegs);
  // suspended chords dont have inversions. they invert to other suspended chords.
  if (suspended > 0) {
    return chordInversion = '-'
  }
  // position in ordered scale degs shows inversion
  var invCalc = chordScaleDegs.length - _.indexOf(orderChordDegs, chordScaleDegs[0]);
  // Triads inversion calculation
  if (chordScaleDegs.length === 3) {
    switch(invCalc) {
      case 1:
          return '1st'
          break;
      case 2:
          return '2nd'
          break;
      default:
          return 'Root'
    }
  }
  // Tetrads inversion calculation
  if (chordScaleDegs.length === 4) {
    switch(invCalc) {
      case 1:
          return '1st'
          break;
      case 2:
          return '2nd'
          break;
      case 3:
          return '3rd'
          break;
      default:
          return 'Root'
    }
  }
  return chordInversion
};

// return chord intervals for display
function getChordIntervals() {
  var chordIntervalNames = _.map(chordIntervals, function(num){ return intervals[num]; });
  return chordIntervalNames.join(' ')
}


// returns current chord note letters without octave number
function ChordNoteLet(){
  return chordLettersStrip
};



module.exports = {
  getAllNotes: getAllNotes,
  getAllModes: getAllModes,
  setKey: setKey,
  setScale: setScale,
  getScaleNotes: getScaleNotes,
  getScaleSynthData: getScaleSynthData,
  getChordScaleDegs: getChordScaleDegs,
  getChordMidiNums: getChordMidiNums,
  getChordFreqs: getChordFreqs,
  getChordFreqInt: getChordFreqInt,
  convertMidiToFreq: convertMidiToFreq,
  getChordNoteLetters: getChordNoteLetters,
  midiNotesList: midiNotesList,
  chordScaleDegs: chordScaleDegs,
  getChordName: getChordName,
  getOrderChordDegs: getOrderChordDegs,
  getChordInversion: getChordInversion,
  getChordIntervals: getChordIntervals,
  getRootNote: getRootNote
}
