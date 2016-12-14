import React from "react";
import _ from "underscore";
import cc from "./ChordCalcs.js";
import webMidi from "./WebMidi.js";
import webSynth from "./Synth.js";
import "./App.css";


var App = React.createClass({

  getInitialState: function() {
    webMidi.midiAccess();

    return {

    }
  },

  padOn: function(btnNum) {
    btnNum = btnNum["elem"];
    var chordRoot = cc.chordRootDegree(btnNum);
    var chordRow = cc.chordRow(btnNum, chordRoot);
    var chordInversion = cc.getChordInversion(chordRoot, chordRow);
    var chordOctAdj = cc.getChordOctaveAdj(chordRoot, chordRow);
    var chordScaleDegs = cc.getChordScaleDegs(chordRoot, chordRow);
    var chordMidiNums = cc.getChordMidiNums(chordScaleDegs, chordInversion, chordOctAdj);
    var chordNoteLetters = cc.getChordNoteLetters(chordMidiNums);
    var chordFreqs = cc.getChordFreqs(chordMidiNums);
    console.log('inversion= '+chordInversion);
    console.log('octaveadj= '+chordOctAdj);
    console.log('chord scale degrees= '+chordScaleDegs);
    console.log('chord midi nums= '+chordMidiNums);
    console.log('chord freqs= '+chordFreqs);
    console.log('root= ' + chordRoot + 'row=' + chordRow);
    console.log('chord letters: ' + chordNoteLetters);
    webSynth.chordPlayOn(chordFreqs, cc.tetrad);
  },

  padOff: function(btnNum) {
    webSynth.chordPlayOff(webSynth.oscillators);
  },

  render: function() {
    return (
      <div className="container">

        <div className="display-box">
          <h1>Current Chord:</h1>
          <p>{cc.chordScaleDegs}</p>
        </div>

        <div className="settings-box">
          {_.range(16).map(function(elem, index) {
            return (
              <div className="button settings-button" key={elem} id={"setting" + elem} onClick={() => {this.trigger("settings", {elem})}}>
              </div>
            );
          }, this)}
        </div>

        <div className="mem-scale-box">
          {_.range(6).map(function(elem, index) {
            return (
              <div className="button chord-mem-button" key={elem} id={"mem" + elem} onClick={() => {this.trigger("mem", {elem})}}>
              </div>
            );
          }, this)}
          {_.range(18).map(function(elem, index) {
            return (
              <div className="button scale-button" key={elem} id={"scale" + elem} onClick={() => {this.trigger("scale", {elem})}}>
              </div>
            );
          }, this)}
        </div>

        <div className="chord-options-box">
          {_.range(8).map(function(elem, index) {
            return (
              <div className="button chord-options-button" key={elem} id={"option" + elem} onClick={() => {this.trigger("opt", {elem})}}>
              </div>
            );
          }, this)}

        </div>

        <div className="chord-matrix-box">
          {_.range(32).map(function(elem, index) {
            return (
              <div className="button chord-matrix-button" key={elem} id={"pad" + elem} onMouseDown={() => {this.padOn({elem})}} onMouseUp={() => {this.padOff({elem})}}>
              </div>
            );
          }, this)}

        </div>


      </div>



    )
  }
})

module.exports = App;
