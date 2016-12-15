const allModes = {
    major :   { "name" : "Major",
                "pattern" : [0,2,4,5,7,9,11,12],
                "notation" : ['I','ii','iii','IV','V','vi','viio','I']
              },
    natMin:   { "name" : "Natural Minor",
                "pattern" : [0,2,3,5,7,8,10,12],
                "notation" : ['i','iio','III','iv','v','VI','VII','i']
              }
    },


    inversionTable = {
      triads: {
        "row3" : [0,0,0,2,2,1,1,1],
        "row2" : [2,2,2,1,1,0,0,0],
        "row1" : [1,1,1,0,0,2,2,2],
        "row0" : [0,0,0,2,2,1,1,1]
              },
      tetrads: {
        "row3" : [3,3,3,2,2,0,0,0],
        "row2" : [2,2,2,1,1,3,3,3],
        "row1" : [1,1,1,0,0,2,2,2],
        "row0" : [0,0,0,3,3,1,1,1]
      }
    },
    octaveAdjTable = {
      triads: {
        "row3" : [1,1,1,0,0,0,0,1],
        "row2" : [0,0,0,0,0,0,0,1],
        "row1" : [0,0,0,0,0,-1,-1,0],
        "row0" : [0,0,0,0,-1,-1,-1,0]
              },
      tetrads: {
        "row3" : [0,0,0,0,0,0,0,1],
        "row2" : [0,0,0,0,0,-1,-1,0],
        "row1" : [0,0,0,0,0,-1,-1,0],
        "row0" : [0,0,0,-1,-1,-1,0,0]
      }
    },
    oneOctave = 12



var scale = "major",
    midiNotesList = {},
    scaleMidiNumbers = [0,2,4,5,7,9,11,12],
    chordScaleDegs = [],
    chordMidiNums = [],
    rootNote = 60,
    chordFreqs = [],
    chordNoteLetters = [],
    noteInfo = {},
    suspension = 0,
    tetrad = false,
    tetradAdj = 6; //6 for 7th or 8 for add9


function createNotes() {
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
  midiNotesList = noteInfo;
};

createNotes();

function getAllModes() {
  return allModes
}

function setKey(newKey) {
  rootNote = parseInt(newKey);
  return rootNote
}

function setScale(selectedScale) {
  console.log(selectedScale);
  var selectedMode = allModes[selectedScale];
  console.log(selectedMode);
  scaleMidiNumbers = selectedMode.pattern;
  console.log(scaleMidiNumbers);
  return selectedMode
}

function chordRootDegree(chordPadID) {
  return parseInt(chordPadID/4);
};

function chordRow(chordPadID, degree) {
  return ( (chordPadID/4) - degree ) * 4;
};

function getChordInversion(chordRoot, chordRow) {
  var rowNum = "row" + chordRow;
  return inversionTable['triads'][rowNum][chordRoot];
};

function getChordOctaveAdj(chordRoot, chordRow) {
  var rowNum = "row" + chordRow;
  return octaveAdjTable['triads'][rowNum][chordRoot];
};

function getChordScaleDegs(chordRoot, inversionRow) {
  chordRoot+= 1;
  chordScaleDegs[0] = chordRoot;
  chordScaleDegs[1] = chordRoot + 2 + suspension;
  chordScaleDegs[2] = chordRoot + 4;
  if (tetrad) {
    chordScaleDegs[3] = chordRoot + tetradAdj;
  };
  chordScaleDegs.forEach(function(item, index) {
    if (item > 7) {
      item-= 7;
      chordScaleDegs[index] = item;
    }
  });
  console.log(chordScaleDegs);
  return chordScaleDegs;
};

function getChordMidiNums(chordScaleDegs, chordInversion, chordOctAdj) {
  chordMidiNums = []; // reset array
  chordOctAdj = chordOctAdj * oneOctave;
  chordScaleDegs.forEach(function(item, index){
    chordMidiNums[index] = scaleMidiNumbers[ chordScaleDegs[index] - 1 ];
    chordMidiNums[index] += chordOctAdj + rootNote;
  });
  // adjust for inversion
  if (chordInversion == 1) {
    console.log('1st invesion adj');
    chordMidiNums[0] += oneOctave;
  } else if (chordInversion == 2) {
    console.log('2nd invesion adj');
    chordMidiNums[0] += oneOctave;
    chordMidiNums[1] += oneOctave;
  } else if (chordInversion == 3) {
    console.log('3rd invesion adj');
    chordMidiNums[0] += oneOctave;
    chordMidiNums[1] += oneOctave;
    chordMidiNums[2] += oneOctave;
  };
  return chordMidiNums;
};

function getChordFreqs(chordMidiNums) {
  chordFreqs = []; // reset array
  chordMidiNums.forEach(function(item, index){
    chordFreqs[index] = convertMidiToFreq(chordMidiNums[index]);
  });
  return chordFreqs;
};

function getChordFreqInt(chordFreqs) {
  var chordFreqInt = []; //reset array
  chordFreqs.forEach(function(item, index){
    chordFreqInt[index] = parseInt(chordFreqs[index])
  });
  return chordFreqInt;
};

function convertMidiToFreq(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
};

function getChordNoteLetters(chordMidiNums) {
  chordNoteLetters = []; //reset array
  chordMidiNums.forEach(function(item, index){
    chordNoteLetters[index] = midiNotesList[chordMidiNums[index]][1];
  });
  return chordNoteLetters;
};

function getChordName(chordMidiNums) {
  console.log("ChordName");
};


module.exports = {
  createNotes: createNotes,
  getAllModes: getAllModes,
  setKey: setKey,
  setScale: setScale,
  chordRootDegree: chordRootDegree,
  chordRow: chordRow,
  getChordInversion: getChordInversion,
  getChordOctaveAdj: getChordOctaveAdj,
  getChordScaleDegs: getChordScaleDegs,
  getChordMidiNums: getChordMidiNums,
  getChordFreqs: getChordFreqs,
  getChordFreqInt: getChordFreqInt,
  convertMidiToFreq: convertMidiToFreq,
  getChordNoteLetters: getChordNoteLetters,
  midiNotesList: midiNotesList,
  chordScaleDegs: chordScaleDegs,
  getChordName: getChordName
}
