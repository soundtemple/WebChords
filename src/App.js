import React from "react";
import WebMidi from "webmidi";
import MidiIO from "./MidiIO.js";
import _ from "underscore";
import cc from "./ChordCalcs.js";
import webSynth from "./Synth.js";
import "./App.css";


var App = React.createClass({

  getInitialState: function() {

    return {
      allNotes: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
      allModes: cc.getAllModes(),
      root: 60,
      scale: "major",
      chordRoot: null,
      chordRow: null,
      chordInversion: null,
      chordOctAdj: null,
      chordScaleDegs: [],
      chordMidiNums: [],
      chordNoteLetters: [],
      chordFreqs: [],
      chordFreqInt: [],
      chordName: null
    }
  },

  setKey: function(event) {
    this.setState({root: event.target.value});
    cc.setKey(event.target.value);
  },

  setScale: function(event) {
    this.setState({scale: event.target.value});
    cc.setScale(event.target.value);
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
    var chordFreqInt = cc.getChordFreqInt(chordFreqs);
    var chordName = cc.getChordName(chordScaleDegs);
    this.setState({
      chordScaleDegs: chordScaleDegs,
      chordMidiNums: chordMidiNums,
      chordNoteLetters: chordNoteLetters,
      chordFreqs: chordFreqs,
      chordFreqInt: chordFreqInt,
      chordName: chordName
    });
    webSynth.chordPlayOn(chordFreqs, cc.tetrad);
  },

  padOff: function(btnNum) {
    webSynth.chordPlayOff(webSynth.oscillators);
  },



  render: function() {
    return (
      <div className="container">
        <div className="display-box">
          <div className="disp-chord-labels">
            <div><p>NAME:</p></div>
            <div><p>NOTES:</p></div>
            <div><p>DEGS:</p></div>
            <div><p>MIDI#:</p></div>
            <div><p>FREQ'S:</p></div>
          </div>
          <div className="disp-chord-data">
            <div><p>Something</p></div>
            <div><p>{this.state.chordNoteLetters.join(' ')}</p></div>
            <div><p>{this.state.chordScaleDegs.join(' ')}</p></div>
            <div><p>{this.state.chordMidiNums.join(' ')}</p></div>
            <div><p>{this.state.chordFreqInt.join(' ')}</p></div>
          </div>
          <div className="scale-info-labels">
            <div><p>ROOT:</p></div>
            <div><p>NAME:</p></div>
            <div><p>NOTES:</p></div>
            <div><p>PLAYED:</p></div>
          </div>
          <div className="scale-info-data">
            <div>
              <select onChange={this.setKey} >
                {this.state.allNotes.map(function(elem, index) {
                  return (
                    <option key={index} value={60 + index}>{elem}</option>
                  );
                })}
              </select>
            </div>
            <div>
              <select onChange={this.setScale}>
                {Object.keys(this.state.allModes).map(function(elem, index) {
                  return (
                    <option key={index} value={elem}>{this.state.allModes[elem].name}</option>
                  );
                }, this)}
              </select>
            </div>
            <div><p>C D E F G A B</p></div>
            <div><p>C3</p></div>
          </div>


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
