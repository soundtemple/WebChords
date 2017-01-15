
var rootNote = 60,
    oscType = 'sawtooth',
    freqCutoff = 10000,
    filterQ = 5,
    vca = 2,
    oscillators = [],
    notes = [],
    context = new AudioContext();

function chordPlayOn(chordFreqNotes, tetrad) {

  var masterVolume = context.createGain();
  var reverb = context.createConvolver();
  var biquadFilter = context.createBiquadFilter();
  var analyser = context.createAnalyser();

  masterVolume.gain.value = vca;
  biquadFilter.connect(masterVolume);
  reverb.connect(biquadFilter);
  // analyser.connect(masterVolume);
  masterVolume.connect(context.destination);

  var osc1 = context.createOscillator(),
      osc2 = context.createOscillator(),
      osc3 = context.createOscillator()

  // set filter
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = 450;
  biquadFilter.gain.value = 0;
  // biquadFilter.frequency.value = freqCutoff;
  // biquadFilter.Q.value = filterQ;

  // connect filter
  osc1.connect(biquadFilter);
  osc2.connect(biquadFilter);
  osc3.connect(biquadFilter);

  // oscillators = [osc1, osc2, osc3, osc4]
  oscillators.push(osc1);
  oscillators.push(osc2);
  oscillators.push(osc3);

  // set oscillator type
  osc1.type = oscType;
  osc2.type = oscType;
  osc3.type = oscType;

  if (tetrad > 0) {
    var osc4 = context.createOscillator();
    oscillators.push(osc4)
    osc4.type = oscType;
    osc4.frequency.value = chordFreqNotes[3];
    osc4.connect(biquadFilter);
    osc4.start(context.currentTime);
  }


  osc1.frequency.value = chordFreqNotes[0];
  osc2.frequency.value = chordFreqNotes[1];
  osc3.frequency.value = chordFreqNotes[2];

  osc1.start(context.currentTime);
  osc2.start(context.currentTime);
  osc3.start(context.currentTime);

};

function chordPlayOff(oscillators) {
  console.log('chordPlayOff');
  oscillators.forEach(function (oscillator, index) {
      oscillator.stop(context.currentTime);
  });
};

function notePlayOn(note) {
  var masterVolume = context.createGain();
  var biquadFilter = context.createBiquadFilter();

  masterVolume.gain.value = vca;
  biquadFilter.connect(masterVolume);
  masterVolume.connect(context.destination);

  var osc1 = context.createOscillator()

  // set filter
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = 450;
  biquadFilter.gain.value = 25;
  // biquadFilter.frequency.value = freqCutoff;
  // biquadFilter.Q.value = filterQ;

  // connect filter
  osc1.connect(biquadFilter);

  // oscillators = [osc1, osc2, osc3, osc4]
  notes.push(osc1);

  // set oscillator type
  osc1.type = oscType;

  osc1.frequency.value = note;

  osc1.start(context.currentTime);

};

function notePlayOff() {
  notes.forEach(function (note, index) {
      note.stop(context.currentTime);
  });
};

module.exports = {
  chordPlayOn: chordPlayOn,
  chordPlayOff: chordPlayOff,
  notePlayOn: notePlayOn,
  notePlayOff: notePlayOff,
  rootNote: rootNote,
  oscillators: oscillators,
}
