// midi mapping for controllers

// Array structure
// BtnTpye, BtnNumID, onColor, offColor, sendsNoteData to play

const mapping = {
    abletonPush1 :   {
      "C1"  : ["pad", 0, 0.2, 0, true],
      "C#1" : ["pad", 1, 0.2, 0, true],
      "D1"  : ["pad", 2, 0.2, 0, true],
      "D#1" : ["pad", 3, 0.2, 0, true],
      "E1"  : ["pad", 4, 0.2, 0, true],
      "F1"  : ["pad", 5, 0.2, 0, true],
      "F#1" : ["pad", 6, 0.2, 0, true],
      "G1"  : ["pad", 7, 0.2, 0, true],
      "G#1" : ["pad", 8, 0.2, 0, true],
      "A1"  : ["pad", 9, 0.2, 0, true],
      "A#1" : ["pad", 10, 0.2, 0, true],
      "B1"  : ["pad", 11, 0.2, 0, true],
      "C2"  : ["pad", 12, 0.2, 0, true],
      "C#2" : ["pad", 13, 0.2, 0, true],
      "D2"  : ["pad", 14, 0.2, 0, true],
      "D#2" : ["pad", 15, 0.2, 0, true],
      "E2"  : ["pad", 16, 0.2, 0, true],
      "F2"  : ["pad", 17, 0.2, 0, true],
      "F#2" : ["pad", 18, 0.2, 0, true],
      "G2"  : ["pad", 19, 0.2, 0, true],
      "G#2" : ["pad", 20, 0.2, 0, true],
      "A2"  : ["pad", 21, 0.2, 0, true],
      "A#2" : ["pad", 22, 0.2, 0, true],
      "B2"  : ["pad", 23, 0.2, 0, true],
      "C3"  : ["pad", 24, 0.2, 0, true],
      "C#3" : ["pad", 25, 0.2, 0, true],
      "D3"  : ["pad", 26, 0.2, 0, true],
      "D#3" : ["pad", 27, 0.2, 0, true],
      "E3"  : ["pad", 28, 0.2, 0, true],
      "F3"  : ["pad", 29, 0.2, 0, true],
      "F#3" : ["pad", 30, 0.2, 0, true],
      "G3"  : ["pad", 31, 0.2, 0, true],
      "F#4" : ["scale", 0, 0.53, 0, true],
      "D5"  : ["scale", 1, 0.53, 0, true],
      "A#5" : ["scale", 2, 0.53, 0, true],
      "G4"  : ["scale", 3, 0.53, 0, true],
      "D#5" : ["scale", 4, 0.53, 0, true],
      "B5"  : ["scale", 5, 0.53, 0, true],
      "G#4" : ["scale", 6, 0.53, 0, true],
      "E5"  : ["scale", 7, 0.53, 0, true],
      "C6"  : ["scale", 8, 0.53, 0.25, true], // Pentatonic toggle
      "A4"  : ["scale", 9, 0.53, 0, true],
      "F5"  : ["scale", 10, 0.53, 0, true],
      "C#6" : ["scale", 11, 0.53, 0, true],
      "A#4" : ["scale", 12, 0.53, 0, true],
      "F#5" : ["scale", 13, 0.53, 0, true],
      "D6"  : ["scale", 14, 0.53, 0, true],
      "B4"  : ["scale", 15, 0.53, 0, true],
      "G5"  : ["scale", 16, 0.53, 0, true],
      "D#6" : ["scale", 17, 0.53, 0.25, true], //Octave +/- button
      "E4"  : ["mem", 0, 0.2, 0.47, false],
      "C5"  : ["mem", 1, 0.2, 0.47, false],
      "G#5" : ["mem", 2, 0.2, 0.47, false],
      "F4"  : ["mem", 3, 0.2, 0.47, false],
      "C#5" : ["mem", 4, 0.2, 0.47, false],
      "A5"  : ["mem", 5, 0.2, 0.47, false],
      "G#3" : ["var", 0, 0.47, 0.61, false],
      "A3"  : ["var", 1, 0.47, 0.61, false],
      "A#3" : ["var", 2, 0.47, 0.61, false],
      // "B3" : ["var", 3, 0.47, 0.61, false], //unused
      "C4"  : ["emb", 0, 0.47, 0.61, false],
      "C#4" : ["emb", 1, 0.47, 0.61, false],
      "D4"  : ["emb", 2, 0.47, 0.61, false],
      // "D#4" : ["emb", 3, 0.47, 0.61, false], //unused
      "20"  : ["setting", 0, 64, 10, false],
      "21"  : ["setting", 1, 0, 0, false],
      "22"  : ["setting", 2, 0, 0, false],
      "23"  : ["setting", 3, 0, 0, false],
      "24"  : ["setting", 4, 0, 0, false],
      "25"  : ["setting", 5, 0, 0, false],
      "26"  : ["setting", 6, 0, 0, false],
      "27"  : ["setting", 7, 64, 10, false],
      "102" : ["setting", 8, 64, 9, false],
      "103" : ["setting", 9, 0, 0, false],
      "104" : ["setting", 10, 0, 0, false],
      "105" : ["setting", 11, 0, 0, false],
      "106" : ["setting", 12, 0, 0, false],
      "107" : ["setting", 13, 0, 0, false],
      "108" : ["setting", 14, 0, 0, false],
      "109" : ["setting", 15, 64, 9, false]
      }
    }

function getMapping(deviceID) {
  return mapping[deviceID]
}



module.exports = {
  getMapping: getMapping,
}
