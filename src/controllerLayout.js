// midi mapping for controllers

// Array structure
// BtnTpye, BtnNumID, onColor, offColor

const mapping = {
    abletonPush1 :   {
      "C1"  : ["Chord", 0],
      "C#1" : ["Chord", 1],
      "D1"  : ["Chord", 2],
      "D#1" : ["Chord", 3],
      "E1"  : ["Chord", 4],
      "F1"  : ["Chord", 5],
      "F#1" : ["Chord", 6],
      "G1"  : ["Chord", 7],
      "G#1" : ["Chord", 8],
      "A1"  : ["Chord", 9],
      "A#1" : ["Chord", 10],
      "B1"  : ["Chord", 11],
      "C2"  : ["Chord", 12],
      "C#2" : ["Chord", 13],
      "D2"  : ["Chord", 14],
      "D#2" : ["Chord", 15],
      "E2"  : ["Chord", 16],
      "F2"  : ["Chord", 17],
      "F#2" : ["Chord", 18],
      "G2"  : ["Chord", 19],
      "G#2" : ["Chord", 20],
      "A2"  : ["Chord", 21],
      "A#2" : ["Chord", 22],
      "B2"  : ["Chord", 23],
      "C3"  : ["Chord", 24],
      "C#3" : ["Chord", 25],
      "D3"  : ["Chord", 26],
      "D#3" : ["Chord", 27],
      "E3"  : ["Chord", 28],
      "F3"  : ["Chord", 29],
      "F#3" : ["Chord", 30],
      "G3"  : ["Chord", 31],
      "F#4" : ["Scale", 0],
      "D5"  : ["Scale", 1],
      "A#5" : ["Scale", 2],
      "G4"  : ["Scale", 3],
      "D#5" : ["Scale", 4],
      "B5"  : ["Scale", 5],
      "G#4" : ["Scale", 6],
      "E5"  : ["Scale", 7],
      "C6"  : ["Pent", 8], // Pentatonic toggle
      "A4"  : ["Scale", 9],
      "F5"  : ["Scale", 10],
      "C#6" : ["Scale", 11],
      "A#4" : ["Scale", 12],
      "F#5" : ["Scale", 13],
      "D6"  : ["Scale", 14],
      "B4"  : ["Scale", 15],
      "G5"  : ["Scale", 16],
      "D#6" : ["Oct", 17], //Octave +/- button
      "E4"  : ["MemChord", 0],
      "C5"  : ["MemChord", 1],
      "G#5" : ["MemChord", 2],
      "F4"  : ["MemChord", 3],
      "C#5" : ["MemChord", 4],
      "A5"  : ["MemChord", 5],
      "G#3" : ["Susp", 0],
      "A3"  : ["Susp", 1],
      "A#3" : ["Susp", 2],
      "C4"  : ["Tetrad", 0],
      "C#4" : ["Tetrad", 1],
      "D4"  : ["Tetrad", 2],
      "20"  : ["Settings", 0],
      "21"  : ["Settings", 1],
      "22"  : ["Settings", 2],
      "23"  : ["Settings", 3],
      "24"  : ["Settings", 4],
      "25"  : ["Settings", 5],
      "26"  : ["Settings", 6],
      "27"  : ["Settings", 7],
      "102" : ["Settings", 8],
      "103" : ["Settings", 9],
      "104" : ["Settings", 10],
      "105" : ["Settings", 11],
      "106" : ["Settings", 12],
      "107" : ["Settings", 13],
      "108" : ["Settings", 14],
      "109" : ["Settings", 15]
      }
    }

function getMapping(deviceID) {
  return mapping[deviceID]
}



module.exports = {
  getMapping: getMapping,
}
