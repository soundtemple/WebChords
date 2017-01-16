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
      tetradLabels: ['TRIAD', '7TH', 'ADD9',''],
      settingsButtons: ['#/b','','','','','','','','SHIFT','','','','','','',''],
      allModes: cc.getAllModes(),
      root: cc.getRootNote(), //sets C2 as base midi note for allNotes key select.
      scale: "major", // allModes Object.key name for major. needed for chordName calc
      chordVariations: 0, // send this state to chord calcs
      tetrad: 0, // send this state to chord calcs
      selectedMode: cc.setScale("major"), //sets initial scale to major
      scaleNotes: [],  //to store results from gettter
      scaleSynthData: [], //to store results from gettter
      chordScaleDegs: [], //to store results from gettter
      midiNotesList: [], //to store results from gettter
      chordMidiNums: [], //to store results from gettter
      chordNoteLetters: [], //to store results from gettter
      chordFreqs: [], //to store results from gettter
      chordFreqInt: [], //to store results from gettter
      orderChordDegs: [], //to store results from gettter
      chordName: null,  //to store results from gettter
      octToggle: false,  // send this state to chord calcs
      pentToggle: false, // send this state to chord calcs
      sharpFlatToggle: false,  // send this state to chord calcs
      shiftToggle: false,  // send this state to chord calcs
      midiInputList: ['Set MIDI IN'],  // just data at present
      midiOutputList: ['Set MIDI OUT'], // just data at present
      padPlay: -1, //for adding Selected Class to chordPad for button light CSS
      scalePlay: -1 //for adding Selected Class to scalePad for button light CSS
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
    // dis-allow sus2 Add 9 Combinations
    if (this.state.tetrad == 2 && chordVariations == 1) {
      this.setState({
        tetrad: 0,
      })
    }
    this.setState({
      chordVariations: chordVariations,
    })
  },

  setTetrad: function(pad) {
    var tetrad = pad;
    // dis-allow sus2 Add 9 Combinations
    if (this.state.chordVariations == 1 && tetrad == 2) {
      this.setState({
        chordVariations: 0,
      })
    }
    this.setState({
      tetrad: tetrad,
    })
  },

  scalePlay: function(padID) {
    switch (padID) {
    case 8:
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
        var scalePlay = padID
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
    this.setState({
      scalePlay: scalePlay,
    })
  },

  scalePlayOff: function() {
    var scalePlay = -1;
    webSynth.notePlayOff();
    this.setState({
      scalePlay: scalePlay,
    })
  },


  padOn: function(btnNum) {
    console.log("PAD ON IS TRIGGERED");
    btnNum = btnNum["elem"];
    var padPlay = btnNum;
    console.log(btnNum);
    var chordScaleDegs = cc.getChordScaleDegs(btnNum, this.state.chordVariations, this.state.tetrad);
    var chordMidiNums = cc.getChordMidiNums(btnNum, chordScaleDegs);
    var chordNoteLetters = cc.getChordNoteLetters(chordMidiNums, this.state.sharpFlatToggle);
    var chordFreqs = cc.getChordFreqs(chordMidiNums);
    var chordFreqInt = cc.getChordFreqInt(chordFreqs);
    var orderChordDegs = cc.getOrderChordDegs(chordNoteLetters)
    var chordName = cc.getChordName(btnNum, chordMidiNums, this.state.tetrad, this.state.chordVariations, this.state.scale);
    var chordInversion = cc.getChordInversion(chordScaleDegs, orderChordDegs, this.state.chordVariations);
    var chordIntervals = cc.getChordIntervals();
    console.log(chordInversion);
    this.setState({
      chordScaleDegs: chordScaleDegs,
      chordMidiNums: chordMidiNums,
      chordNoteLetters: chordNoteLetters,
      chordFreqs: chordFreqs,
      chordFreqInt: chordFreqInt,
      chordName: chordName,
      orderChordDegs: orderChordDegs,
      chordInversion: chordInversion,
      chordIntervals: chordIntervals,
      padPlay: padPlay,
    });
    webSynth.chordPlayOn(chordFreqs, this.state.tetrad);
  },



  padOff: function(btnNum) {
    var padPlay = -1;
    this.setState({
      padPlay: padPlay,
    });
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


  getMidiIn: function() {
    var midiInputList = MidiIO.getInputList();
    this.setState({
      midiInputList: midiInputList
    })
  },

  getMidiOut: function() {
    var midiOutputList = MidiIO.getOutputList();
    this.setState({
      midiOutputList: midiOutputList
    })
  },

  setMidiIn: function(event) {
    MidiIO.setMidiIn(event.target.value)

  },

  setMidiOut: function(event) {
    MidiIO.setMidiOut(event.target.value)
  },

  render: function() {
    return (
      <div className="container">
        <div className="display-box">
          <div className="disp-chord-labels">
            <div><p>NAME:</p></div>
            <div><p>INV:</p></div>
            <div><p>INT:</p></div>
            <div><p>NOTES:</p></div>
            <div><p>DEGS:</p></div>
            <div><p>MIDI#:</p></div>
            <div><p>FREQS:</p></div>
          </div>
          <div className="disp-chord-data">
            <div><p>{this.state.chordName}</p></div>
            <div><p>{this.state.chordInversion}</p></div>
            <div><p>{this.state.chordIntervals}</p></div>
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
            <select onClick={this.getMidiIn} onChange={this.setMidiIn}>
              {this.state.midiInputList.map(function(elem, index) {
                return (
                    <option key={index} value={elem}>{elem}</option>
                )
              })}
            </select>
            <select onClick={this.getMidiOut} onChange={this.setMidiOut}>
              {this.state.midiOutputList.map(function(elem, index) {
                return (
                    <option key={index} value={elem}>{elem}</option>
                )
              })}
            </select>

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
            if (this.state.scalePlay == elem) {
              classNameList += " selected";
            }
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
              <div className={classNameList} key={elem} id={"var" + elem} onMouseDown={() => {this.setChordVar(elem)}}>{this.state.chordVarLabels[index]}
              </div>
            );
          }, this)}
          {_.range(4).map(function(elem, index) {
            var classNameList = "button chord-options-button"
            if (this.state.tetrad == elem) {
              classNameList += " selected";
            }
            return (
              <div className={classNameList} key={elem} id={"emb" + elem} onMouseDown={() => {this.setTetrad(elem)}}>{this.state.tetradLabels[index]}
              </div>
            );
          }, this)}

        </div>

        <div className="chord-matrix-box">
          {_.range(32).map(function(elem, index) {
            var classNameList = "button chord-matrix-button"
            if (this.state.padPlay == elem) {
              classNameList += " selected";
            }
            return (
              <div className={classNameList} key={elem} id={"pad" + elem} onMouseDown={() => {this.padOn({elem})}} onMouseUp={() => {this.padOff({elem})}}  >
              </div>
            );
          }, this)}

        </div>

      </div>



    )
  }
})

module.exports = App;
