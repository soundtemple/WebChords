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
      settingsButtons: ['#/b','','','','','','','','SHIFT','','','','','','',''],
      allModes: cc.getAllModes(),
      root: 48,
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
      midiNotesList: [],
      chordMidiNums: [],
      chordNoteLetters: [],
      chordFreqs: [],
      chordFreqInt: [],
      orderChordDegs: [],
      chordName: null,
      octToggle: false,
      pentToggle: false,
      sharpFlatToggle: false,
      shiftToggle: false,
      midiInputList: ['Hit Connect IN'],
      midiOutputList: ['Hit Connect OUT']
    }
  },

  setKey: function(event) {
    cc.setKey(event.target.value);
    var scaleNotes = cc.getScaleNotes(this.state.selectedMode, this.state.sharpFlatToggle);
    var scaleSynthData = cc.getScaleSynthData(this.state.selectedMode, this.state.octToggle, this.state.sharpFlatToggle)
    this.setState({
      scaleNotes: scaleNotes,
      scaleSynthData: scaleSynthData
    })
  },

  setScale: function(event) {
    var selectedMode = cc.setScale(event.target.value);
    var scaleNotes = cc.getScaleNotes(selectedMode, this.state.sharpFlatToggle);
    var scaleSynthData = cc.getScaleSynthData(selectedMode, this.state.octToggle, this.state.sharpFlatToggle)
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
    switch (padID) {
    case 8:
        console.log('Toggle Pentatonic= ' + this.state.pentToggle );
        this.state.pentToggle = !this.state.pentToggle;
        var pent = this.state.pentToggle;
        this.setState({
          pent: pent
        });
        break;
    case 17:
        this.state.octToggle = !this.state.octToggle;
        var scaleSynthData = cc.getScaleSynthData(this.state.selectedMode, this.state.octToggle, this.state.sharpFlatToggle)
        this.setState({
          scaleSynthData: scaleSynthData,
        });
        break;
    default:
        var noteToPlay = this.state.scaleSynthData[padID];
        var midiNotesList = cc.getAllNotes();
        var checkSharps = 0;
        if (!this.state.sharpFlatToggle) {
          checkSharps = 1;
        }
        Object.keys(midiNotesList).map(function(elem, index) {
          var thisNote = midiNotesList[elem][checkSharps];
          if (noteToPlay == thisNote) {
            var freqToPlay = cc.convertMidiToFreq(index);
            webSynth.notePlayOn(freqToPlay);
          }
        });

    }
  },

  scalePlayOff: function() {
    webSynth.notePlayOff();
  },


  padOn: function(btnNum) {
    btnNum = btnNum["elem"];
    var chordScaleDegs = cc.getChordScaleDegs(btnNum, this.state.chordVariations, this.state.chordEmb);
    var chordMidiNums = cc.getChordMidiNums(btnNum, chordScaleDegs);
    var chordNoteLetters = cc.getChordNoteLetters(chordMidiNums, this.state.sharpFlatToggle);
    var chordFreqs = cc.getChordFreqs(chordMidiNums);
    var chordFreqInt = cc.getChordFreqInt(chordFreqs);
    var chordName = cc.getChordName(btnNum, chordScaleDegs);
    var orderChordDegs = cc.getOrderChordDegs(chordNoteLetters)
    this.setState({
      chordScaleDegs: chordScaleDegs,
      chordMidiNums: chordMidiNums,
      chordNoteLetters: chordNoteLetters,
      chordFreqs: chordFreqs,
      chordFreqInt: chordFreqInt,
      chordName: chordName,
      orderChordDegs: orderChordDegs
    });
    webSynth.chordPlayOn(chordFreqs, this.state.chordEmb);
  },



  padOff: function(btnNum) {
    webSynth.chordPlayOff(webSynth.oscillators);
  },

  settings: function(btnNum) {
    switch (btnNum) {
    case 0:
      this.state.sharpFlatToggle = !this.state.sharpFlatToggle;
      console.log("sharp flat toggle=" + this.state.sharpFlatToggle);
      var scaleNotes = cc.getScaleNotes(this.state.selectedMode, this.state.sharpFlatToggle);
      var scaleSynthData = cc.getScaleSynthData(this.state.selectedMode, this.state.octToggle, this.state.sharpFlatToggle )
      this.setState({
        scaleNotes: scaleNotes,
        scaleSynthData: scaleSynthData
      });
      break;
    case 8:
      this.state.shiftToggle = !this.state.shiftToggle;
      var shift = this.state.shiftToggle;
      console.log("shift toggle=" + this.state.shiftToggle);
        this.setState({
          shift: shift
        });
      break;
    default:
      console.log("No settings assigned");
    }
  },

  refreshMidi: function() {
    console.log("button clicked calling function");
    var midiInputList = MidiIO.getMidiInputList();
    var midiOutputList =  MidiIO.getMidiOutputList();
    this.setState({
      midiInputList: midiInputList,
      midiOutputList: midiOutputList
    })
  },

  setMidiIn: function() {
    MidiIO.connectMidiInput('Ableton Push User Port');
  },

  setMidiOut: function() {
    MidiIO.connectMidiOutput('Circuit');
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
            <div><p>{this.state.chordName}</p></div>
            <div><p>{this.state.chordNoteLetters.join(' ')}</p></div>
            <div><p>{this.state.orderChordDegs.join(' ')}</p></div>
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
                    <option key={index} value={parseInt(this.state.root) + index}>{elem}</option>
                  );
                }, this)}
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
            <select onClick={this.setMidiIn}>
              {this.state.midiInputList.map(function(elem, index) {
                return (
                    <option key={index} value={elem}>{elem}</option>
                )
              })}
            </select>
            <select onClick={this.setMidiOut}>
              {this.state.midiOutputList.map(function(elem, index) {
                return (
                    <option key={index} value={elem}>{elem}</option>
                )
              })}
            </select>
            <button onClick={this.refreshMidi}>Refresh Midi</button>
          </div>

        </div>

        <div className="settings-box">
          {_.range(16).map(function(elem, index) {
            var classNameList = "button settings-button"
            if (this.state.sharpFlatToggle && elem == 0) {
              classNameList+= " selected";
            };
            if (this.state.shiftToggle && elem == 8) {
              classNameList+= " shifted";
            };
            return (
              <div className={classNameList} key={elem} id={"setting" + elem} onClick={() => {this.settings(elem)}}>{this.state.settingsButtons[index]}
              </div>
            );
          }, this)}
        </div>

        <div className="mem-scale-box">
          {/* chord mem buttons*/}
          {_.range(6).map(function(elem, index) {
            var classNameList = "button chord-mem-button";
            if (this.state.shiftToggle) {
              classNameList+= " shifted"
            }
            return (
              <div className={classNameList} key={elem} id={"mem" + elem} onClick={() => {this.trigger("mem", {elem})}}>MEM{index + 1}
              </div>
            );
          }, this)}
          {/* scale play buttons*/}
          {_.range(18).map(function(elem, index) {
            var classNameList = "button scale-button";
            if (this.state.octToggle && index == 17) {
              classNameList+= " selected";
            };
            if (this.state.pentToggle && index == 8) {
              classNameList+= " selected";
            };
            return (
              <div className={classNameList} key={elem} id={"scale" + elem} onMouseDown={() => {this.scalePlay(elem)}} onMouseUp={() => {this.scalePlayOff(elem)}} >{this.state.scaleSynthData[index]}
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
