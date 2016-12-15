import WebMidi from "webmidi";
import cc from "./ChordCalcs.js";






// function getMidiInputList() {
//   WebMidi.enable(function (err) {
//     // success or failure message
//     var inputList = [];
//     if (err) {
//       console.log("WebMidi could not get MIDI Input list", err);
//       return ['no inputs']
//     } else {
//       var midiIns = WebMidi.inputs;
//       midiIns.map(function(elem, index) {
//         inputList[index] = midiIns[index]["_midiInput"].name
//       });
//       console.log("INPUTS: "+ inputList);
//       console.log(inputList);
//       return inputList
//     }
//   })
//
// }
//
// function getMidiOutputList() {
//   WebMidi.enable(function (err) {
//     // success or failure message
//     var outputList = [];
//     if (err) {
//       console.log("WebMidi could not get MIDI Output list", err);
//       return ['no outputs']
//     } else {
//       var midiOuts = WebMidi.outputs;
//       midiOuts.map(function(elem, index) {
//         outputList[index] = midiOuts[index]["_midiOutput"].name
//       });
//       console.log("OUTPUTS: "+ outputList);
//       console.log(outputList);
//       return outputList
//     }
//   })
// }
//
// function connectMidiInput(name) {
//   WebMidi.enable(function (err) {
//     // success or failure message
//     if (err) {
//       console.log("Could Not Connect", err);
//     } else {
//       console.log("Connection Made");
//     }
//     var selectedInput = WebMidi.getInputByName(name)
//     console.log(selectedInput);
//   });
// }
//
// function connectMidiOutput(name) {
//   WebMidi.enable(function (err) {
//     // success or failure message
//     if (err) {
//       console.log("Could Not Connect", err);
//     } else {
//       console.log("Connection Made");
//     }
//     var selectedOutput = WebMidi.getOutputByName(name)
//     console.log(selectedOutput);
//   })
// };

WebMidi.enable(function (err) {

  // success or failure message
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    console.log("Web midi time = " + WebMidi.time)
  }


  var midiOuts = WebMidi.outputs;
  var midiIns = WebMidi.inputs;
  var deviceList = [];
  var outputList = [];

  // midiIns.map(function(elem, index) {
  //   deviceList[index] = midiIns[index]["_midiInput"].name
  // });
  // console.log("INPUTS: "+deviceList);
  //
  //
  // midiOuts.map(function(elem, index) {
  //   outputList[index] = midiOuts[index]["_midiOutput"].name
  // });
  // console.log("OUTPUTS: "+ outputList);

  // var output = WebMidi.getOutputByName("Circuit");


  // var pushUserOut = WebMidi.getOutputByName("Ableton Push User Port");

  // var pushOnOffData = {
  //   [36,0,]
  // }

  // pushUserOut.playNote("G1", 1, {velocity: 0.2});

  var chordToPlay = ['C3', 'E3', 'G3']
  // 0.1 =yellow; 0.2=purple; 0.4=light green; light-blue; 0.9 bright green; 0.56=white
  //  push messsages 36-99
  // set input to ABleton Push User
  // var input = WebMidi.getInputByName("Ableton Push User Port");
  var input = WebMidi.getInputByName("LPK25");
  var output = WebMidi.getOutputByName("Circuit");

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      var noteOn = e.note.name + e.note.octave;
      console.log(noteOn);
      // pushUserOut.playNote(noteOn, 1, {velocity: .56});

      console.log(chordToPlay);
      output.playNote(chordToPlay, 1);

      // if (noteOn == "C1") {
      //   console.log('Hey this is C-1');
      // }
    }
  );

  input.addListener('noteoff', "all",
    function (e) {
      // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      var noteOff = e.note.name + e.note.octave;
      console.log(chordToPlay);
      output.stopNote(chordToPlay, 1);

      // if (noteOff == "C-1") {
      //   console.log('Hey this is C-1 turning off');
      //   output.stopNote(noteOff, 1);
      //   // cc.getChordScaleDegs(1);
      // }
    }
  );

});


module.exports = {
  // getMidiInputList: getMidiInputList,
  // getMidiOutputList: getMidiOutputList,
  // connectMidiInput: connectMidiInput,
  // connectMidiOutput: connectMidiOutput
}
