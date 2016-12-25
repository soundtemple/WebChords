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
        "row0" : [0,0,0,-1,-1,-1,-1,0]
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
    scalePattern = [0,2,4,5,7,9,11,12],
    chordScaleDegs = [],
    chordMidiNums = [],
    rootNote = 48,
    scaleNoteLetters = [],
    scaleSynthData = [],
    chordFreqs = [],
    chordNoteLetters = [],
    noteInfo = {}


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

function getAllModes() {
  return allModes
}

function setKey(newKey) {
  rootNote = parseInt(newKey);
  return rootNote
}

function getScaleNotes(selectedMode, sharpFlatToggle) {
  scaleNoteLetters = []; //reset array
  var dispSharps = 0;
  if (!sharpFlatToggle) {
    dispSharps = 1;
  }
  selectedMode.pattern.forEach(function (elem, index){
    scaleNoteLetters[index] = midiNotesList[elem + rootNote][dispSharps];
  })
  return scaleNoteLetters
};

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

function setScale(selectedScale) {
  var selectedMode = allModes[selectedScale];
  scalePattern = selectedMode.pattern;
  return selectedMode
}

function getChordScaleDegs(btnNum, chordVariations, chordEmb) {
  var chordRoot = btnNum%8;
  var suspension = 0;
  chordScaleDegs = [];
  // suspended chord adj.
  if (chordVariations == 1) {
      suspension = -1;
  } else if (chordVariations == 2) {
    suspension = 1;
  }
  chordRoot+= 1;
  chordScaleDegs[0] = chordRoot;
  chordScaleDegs[1] = chordRoot + 2 + suspension;
  chordScaleDegs[2] = chordRoot + 4;
  // adj for 7th or Add9 chord
  if (chordEmb == 1) {
    chordScaleDegs[3] = chordRoot + 6; //6 scale degrees to add 7th;
  } else if (chordEmb == 2) {
    chordScaleDegs[3] = chordRoot + 8; //8 scale degrees to add 9th;
  };
  // adj so scale degrees in same octave.
  chordScaleDegs.forEach(function(item, index) {
    if (item > 7) {
      item-= 7;
      chordScaleDegs[index] = item;
    }
  });
  return chordScaleDegs;
};

function getChordMidiNums(btnNum, chordScaleDegs) {
  var chordRow = parseInt(btnNum/8) // row determines inversion
  chordMidiNums = []; // reset array
  chordScaleDegs.forEach(function(item, index){
    chordMidiNums[index] = scalePattern[ chordScaleDegs[index] - 1 ] + rootNote;
    // adj for last column root up one octave.
    if (btnNum%8 == 7) {
      chordMidiNums[index]+= 12;
    }
  });
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

function getOrderChordDegs(scaleNotes, chordNoteLetters) {
  var orderChordDegs = [];
  console.log('this is the scale notes= '+scaleNotes);
  console.log('this is the chordNoteLetters= '+chordNoteLetters);
  chordNoteLetters.forEach(function(item, index){
    orderChordDegs[index] = scaleNotes.indexOf(chordNoteLetters[index])
  });
  return orderChordDegs;
}

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
  console.log(chordNoteLetters);
  return chordNoteLetters;
};

function getChordName(chordMidiNums) {
  console.log("ChordName");
};

function cNotesToMidiIO(){
  return chordNoteLetters
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
  cNotesToMidiIO: cNotesToMidiIO,
  getOrderChordDegs: getOrderChordDegs
}
