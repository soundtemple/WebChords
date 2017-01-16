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
    controllerMsgData,
    controllerMsg,
    notesToPlay,
    midiOutOn

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
};

function setMidiLetters(midiLetters, midiOut) {
  notesToPlay = midiLetters;
  midiOutOn = midiOut
};

function handleClickEvents(eventType) {
  var clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent(eventType, true, true);
  console.log('PAD_ID: ' + controllerMsg[0]+ controllerMsg[1]);
  document.getElementById(controllerMsg[0]+ controllerMsg[1]).dispatchEvent(clickEvent);
};

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
      controllerMsg = controllerMsgData[noteOn]
      console.log('this is the controller msg' + controllerMsg);
      if (controllerMsg) {
        console.log('chord ON!!' + controllerMsg[0] + controllerMsg[1]);
        handleClickEvents('mousedown');
        lightFback.playNote(noteOn, 1, {velocity: controllerMsg[2]})
      }
      if (midiOutOn && controllerMsg[4]) {
        output.playNote(notesToPlay, 2 );
      }
    }
  );

  // listen for note off messages
  input.addListener('noteoff', "all",
    function (e) {
      if (controllerMsg) {
        console.log('chord off!!');
        e.note.octave += 2;
        var noteOff = e.note.name + e.note.octave;
        handleClickEvents('mouseup');
        lightFback.playNote(noteOff, 1, {velocity: controllerMsg[3]})
      }
      if (midiOutOn) {
        output.stopNote(notesToPlay, 2);
      }
    });

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      controllerMsg = controllerMsgData[e.data[1]]
      if (controllerMsg) {
        var padColor = controllerMsg[2];
        if (e.value == 0) {
          padColor = controllerMsg[3];
        }
        lightFback.sendControlChange(e.data[1], padColor, 1);
        console.log('sent cc to: ' + e.data[1] + controllerMsg[2], 1 );
        if (e.value > 0) {
          handleClickEvents('mousedown');
        }

      }
    });


});

// cc value = velocity
// cc channel = midi channel
// cc data[1] = cc number
// output.stopNote(noteOff, 2);
// output.playNote(noteOff, 2, {velocity: 0} );
// var chordToPlay = ['C3', 'E3', 'G3']
// 0.1 =yellow; 0.2=purple; 0.25= lightblue 0.4=light green; .41=lightPink; .45=hotpink; 0.47=orange; 0.48=lighterorange; 0.53=blue;  0.56=white
//  push messsages 36-99

module.exports = {
  getInputList: getInputList,
  getOutputList: getOutputList,
  setMidiIn: setMidiIn,
  setMidiOut: setMidiOut,
  setMidiLetters: setMidiLetters

}
