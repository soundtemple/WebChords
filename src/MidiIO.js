import WebMidi from "webmidi";
import cc from "./ChordCalcs.js";


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

  midiIns.map(function(elem, index) {
    deviceList[index] = midiIns[index]["_midiInput"].name
  });
  console.log("INPUTS: "+deviceList);


  midiOuts.map(function(elem, index) {
    outputList[index] = midiOuts[index]["_midiOutput"].name
  });
  console.log("OUTPUTS: "+ outputList);

  var selectedOutput = WebMidi.getOutputByName(outputList[0])
  console.log(selectedOutput);

  var output = WebMidi.outputs[4];


  var pushUserOut = WebMidi.getOutputByName("Ableton Push User Port");

  pushUserOut.playNote("G1", 1, {velocity: 0.1});

  var input = WebMidi.getInputByName("Ableton Push User Port");

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      var notePlayed = e.note.name + e.note.octave;
      console.log(notePlayed);

      if (notePlayed == "C-1") {
        console.log('Hey this is C-1');
        output.playNote(["C3", "D#3", "G3"], 1);
        cc.getChordScaleDegs(1);
      }
    }
  );


  input.addListener('noteoff', "all",
    function (e) {
      // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      var notePlayed = e.note.name + e.note.octave;
      console.log(notePlayed);

      if (notePlayed == "C-1") {
        console.log('Hey this is C-1 turning off');
        output.stopNote(["C3", "D#3", "G3"], 1);
        // cc.getChordScaleDegs(1);
      }
    }
  );

});
