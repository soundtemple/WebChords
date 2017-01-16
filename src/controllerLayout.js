// midi mapping for controllers

// Array structure
// BtnTpye, BtnNumID, onColor, offColor

const mapping = {
    abletonPush1 :   {
      "C1"  : ["pad", 0],
      "C#1" : ["pad", 1],
      "D1"  : ["pad", 2],
      "D#1" : ["pad", 3],
      "E1"  : ["pad", 4],
      "F1"  : ["pad", 5],
      "F#1" : ["pad", 6],
      "G1"  : ["pad", 7],
      "G#1" : ["pad", 8],
      "A1"  : ["pad", 9],
      "A#1" : ["pad", 10],
      "B1"  : ["pad", 11],
      "C2"  : ["pad", 12],
      "C#2" : ["pad", 13],
      "D2"  : ["pad", 14],
      "D#2" : ["pad", 15],
      "E2"  : ["pad", 16],
      "F2"  : ["pad", 17],
      "F#2" : ["pad", 18],
      "G2"  : ["pad", 19],
      "G#2" : ["pad", 20],
      "A2"  : ["pad", 21],
      "A#2" : ["pad", 22],
      "B2"  : ["pad", 23],
      "C3"  : ["pad", 24],
      "C#3" : ["pad", 25],
      "D3"  : ["pad", 26],
      "D#3" : ["pad", 27],
      "E3"  : ["pad", 28],
      "F3"  : ["pad", 29],
      "F#3" : ["pad", 30],
      "G3"  : ["pad", 31],
      "F#4" : ["scale", 0],
      "D5"  : ["scale", 1],
      "A#5" : ["scale", 2],
      "G4"  : ["scale", 3],
      "D#5" : ["scale", 4],
      "B5"  : ["scale", 5],
      "G#4" : ["scale", 6],
      "E5"  : ["scale", 7],
      "C6"  : ["scale", 8], // Pentatonic toggle
      "A4"  : ["scale", 9],
      "F5"  : ["scale", 10],
      "C#6" : ["scale", 11],
      "A#4" : ["scale", 12],
      "F#5" : ["scale", 13],
      "D6"  : ["scale", 14],
      "B4"  : ["scale", 15],
      "G5"  : ["scale", 16],
      "D#6" : ["scale", 17], //Octave +/- button
      "E4"  : ["mem", 0],
      "C5"  : ["mem", 1],
      "G#5" : ["mem", 2],
      "F4"  : ["mem", 3],
      "C#5" : ["mem", 4],
      "A5"  : ["mem", 5],
      "G#3" : ["var", 0],
      "A3"  : ["var", 1],
      "A#3" : ["var", 2],
      // "B3" : ["var", 3], //unused
      "C4"  : ["emb", 0],
      "C#4" : ["emb", 1],
      "D4"  : ["emb", 2],
      // "D#4" : ["emb", 3], //unused
      "20"  : ["setting", 0],
      "21"  : ["setting", 1],
      "22"  : ["setting", 2],
      "23"  : ["setting", 3],
      "24"  : ["setting", 4],
      "25"  : ["setting", 5],
      "26"  : ["setting", 6],
      "27"  : ["setting", 7],
      "102" : ["setting", 8],
      "103" : ["setting", 9],
      "104" : ["setting", 10],
      "105" : ["setting", 11],
      "106" : ["setting", 12],
      "107" : ["setting", 13],
      "108" : ["setting", 14],
      "109" : ["setting", 15]
      }
    }

function getMapping(deviceID) {
  return mapping[deviceID]
}



module.exports = {
  getMapping: getMapping,
}
