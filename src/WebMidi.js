function midiAccess() {
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false // this defaults to 'false'
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }
};

function onMIDISuccess() {
  // when we get a succesful response, run this code
  console.log('Success. MIDI Access Object', midiAccess);
  // when we get a succesful response, run this code
  var midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  // .values() method returns an array of a given object's own enumerable property values, in the same order as that provided by a for...in loop
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;
  }
};

function onMIDIFailure() {
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. " + e);
};

function onMIDIMessage() {
  var chordRoot = 60;
  data = message.data; // this gives us our [command/channel, note, velocity] data.
  debugger
  console.log('MIDI data', data); // MIDI data [144, 63, 73]
  if(data[0] == 144) {
    chordRoot = data[1] - 59;
    console.log(chordRoot);
    if(chordRoot > 8 || chordRoot < 1){
      return
    }
    // getChordScaleDegs(chordRoot);
    // chordPlayOn(chordFreqNotes);
  }
  if(data[0] == 128) {
    // chordPlayOff();
  }
};


module.exports = {
  midiAccess: midiAccess,
  onMIDISuccess: onMIDISuccess,
  onMIDIFailure: onMIDIFailure,
  onMIDIMessage: onMIDIMessage
}
