// midi mapping for controllers

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
      "G3"  : ["Chord", 31]
      }
    }

function getMapping(deviceID) {
  return mapping[deviceID]
}



module.exports = {
  getMapping: getMapping,
}
