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
      chordVarLabels: ['ROOT', 'SUS2', 'SUS4', ''],
      chordEmbLabels: ['TRIAD', '7TH', 'ADD9',''],
      allModes: cc.getAllModes(),
      root: 60,
      scale: "major",
      chordVariations: 0,
      chordEmb: 0,
      selectedMode: cc.setScale("major"),
      scaleNotes: [],
      scaleSynthData: [],
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
    var scaleNotes = cc.getScaleNotes(this.state.selectedMode);
    var scaleSynthData = cc.getScaleSynthData(this.state.selectedMode)
    this.setState({
      scaleNotes: scaleNotes,
      scaleSynthData: scaleSynthData
    })
  },

  setScale: function(event) {
    var selectedMode = cc.setScale(event.target.value);
    var scaleNotes = cc.getScaleNotes(selectedMode);
    var scaleSynthData = cc.getScaleSynthData(selectedMode)
    this.setState({
      scale: event.target.value,
      selectedMode: selectedMode,
      scaleNotes: scaleNotes,
      scaleSynthData: scaleSynthData
    });
  },

  setChordVar: function(pad) {
    var chordVariations = pad;
    this.setState({
      chordVariations: chordVariations,
    })
  },

  setChordEmb: function(pad) {
    var chordEmb = pad;
    this.setState({
      chordEmb: chordEmb,
    })
  },

  scalePlay: function(padID) {
    if (padID == 8) {
      console.log('Toggle Pentatonic');
    } else if (padID == 17) {
      console.log('Toggle octave adj');
    } else {
      console.log('play note need note name');
    }
  },

  padOn: function(btnNum) {
    btnNum = btnNum["elem"];
    var chordRoot = cc.chordRootDegree(btnNum);
    var chordRow = cc.chordRow(btnNum, chordRoot);
    var chordInversion = cc.getChordInversion(chordRoot, chordRow);
    var chordOctAdj = cc.getChordOctaveAdj(chordRoot, chordRow);
    var chordScaleDegs = cc.getChordScaleDegs(chordRoot, chordRow, this.state.chordVariations, this.state.chordEmb);
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
    webSynth.chordPlayOn(chordFreqs, this.state.chordEmb);
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
            <div><p>{this.state.scaleNotes.join(' ')}</p></div>
          </div>
          <div className="settings-labels">
            <div><p>MIDI IN:</p></div>
            <div><p>MIDI OUT:</p></div>

          </div>
          <div className="settings-data">

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
          {/* chord mem buttons*/}
          {_.range(6).map(function(elem, index) {
            return (
              <div className="button chord-mem-button" key={elem} id={"mem" + elem} onClick={() => {this.trigger("mem", {elem})}}>MEM{index + 1}
              </div>
            );
          }, this)}
          {/* scale play buttons*/}
          {_.range(18).map(function(elem, index) {
            return (
              <div className="button scale-button" key={elem} id={"scale" + elem} onClick={() => {this.scalePlay(elem)}}>{this.state.scaleSynthData[index]}
              </div>
            );
          }, this)}
        </div>

        <div className="chord-options-box">
          {_.range(4).map(function(elem, index) {
            var classNameList = "button chord-options-button"
            if (this.state.chordVariations == elem) {
              classNameList += " selected";
            }
            return (
              <div className={classNameList} key={elem} id={"var" + elem} onClick={() => {this.setChordVar(elem)}}>{this.state.chordVarLabels[index]}
              </div>
            );
          }, this)}
          {_.range(4).map(function(elem, index) {
            var classNameList = "button chord-options-button"
            if (this.state.chordEmb == elem) {
              classNameList += " selected";
            }
            return (
              <div className={classNameList} key={elem} id={"emb" + elem} onClick={() => {this.setChordEmb(elem)}}>{this.state.chordEmbLabels[index]}
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
