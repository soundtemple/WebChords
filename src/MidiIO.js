import WebMidi from "webmidi";
import cc from "./ChordCalcs.js";
import $ from "jquery";
import cMData from "./controllerLayout.js"



var inputList = [],
    outputList = [],
    inputDevice = "Ableton Push User Port",
    outputDevice = "Circuit",
    mappingID = "abletonPush1",
    input,
    output,
    lightFback,
    chordToPlay = [],
    controllerMsgData

function getInputList() {
  return inputList
};

function getOutputList() {
  return outputList
};

function setMidiIn(MidiInputSelected) {
  inputDevice = MidiInputSelected
  console.log('MIDI INPUT= ' + inputDevice);
};

function setMidiOut(MidiOutputSelected) {
  outputDevice = MidiOutputSelected
  console.log('MIDI OUTPUT= ' + outputDevice);
};

function getDeviceMapping(mappingID){
  controllerMsgData = cMData.getMapping(mappingID);
}

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

  // set midi ins and outs to variables
  var midiOuts = WebMidi.outputs;
  var midiIns = WebMidi.inputs;

  // map these variables to an array
  midiIns.map(function(elem, index) {
    inputList[index] = midiIns[index]["_midiInput"].name
  });

  midiOuts.map(function(elem, index) {
    outputList[index] = midiOuts[index]["_midiOutput"].name
  });

  var input = WebMidi.getInputByName(inputDevice);
  getDeviceMapping(mappingID)
  var lightFback = WebMidi.getOutputByName(inputDevice);
  var output = WebMidi.getOutputByName(outputDevice);


  // listen for change in I/O select and update WebMidi - NOT WORKING ????
  $('select').on('change', function() {
    input = WebMidi.getInputByName(inputDevice);
    output = WebMidi.getOutputByName(outputDevice);
    lightFback = WebMidi.getOutputByName(inputDevice);
    // console.log('new I/O settings: ' + input.name + inputDevice + ' / ' + output.name + outputDevice);
  })


  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      e.note.octave += 2;
      var noteOn = e.note.name + e.note.octave;
      var controllerMsg = controllerMsgData[noteOn]
      if (!controllerMsg) {
        controllerMsg = ['Unused']
      }
      switch(controllerMsg[0]) {
        case 'Chord':
            console.log('Run ChordPlay Function. Pad' + controllerMsg[1]);
            chordToPlay = cc.getMidiChord(controllerMsg[1])
            console.log(chordToPlay);
            output.playNote(chordToPlay, 2, {velocity: .5} );
            lightFback.playNote(noteOn, 1, {velocity: .2} )
            break;
        case 'Note':
            console.log('Run NotePlay Function');
            break;
        default:
            break
      }


    }
  );

  // listen for note off messages
  input.addListener('noteoff', "all",
    function (e) {
      e.note.octave += 2;
      var noteOff = e.note.name + e.note.octave;
      output.stopNote(chordToPlay, 2);
      // output.stopNote(noteOff, 2);
      // output.playNote(noteOff, 2, {velocity: 0} );
      lightFback.playNote(noteOff, 1, {velocity: 0})
    }
  );

});


// var chordToPlay = ['C3', 'E3', 'G3']
// 0.1 =yellow; 0.2=purple; 0.4=light green; light-blue; 0.9 bright green; 0.56=white
//  push messsages 36-99

module.exports = {
  getInputList: getInputList,
  getOutputList: getOutputList,
  setMidiIn: setMidiIn,
  setMidiOut: setMidiOut

}
