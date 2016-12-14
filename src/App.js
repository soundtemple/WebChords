var React = require('react');
var _ = require('underscore');
require('./App.css');


var App = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className="container">

        <div className="display-box">
          <h1>Current Chord:</h1>
        </div>

        <div className="settings-box">
          {_.range(16).map(function(elem, index) {
            return (
              <div className="button settings-button" key={elem} id={"setting" + elem}>
              </div>
            );
          })}
        </div>

        <div className="mem-scale-box">
          {_.range(6).map(function(elem, index) {
            return (
              <div className="button chord-mem-button" key={elem} id={"mem" + elem}>
              </div>
            );
          })}
          {_.range(18).map(function(elem, index) {
            return (
              <div className="button scale-button" key={elem} id={"scale" + elem}>
              </div>
            );
          })}
        </div>

        <div className="chord-options-box">
          {_.range(8).map(function(elem, index) {
            return (
              <div className="button chord-options-button" key={elem} id={"option" + elem}>
              </div>
            );
          })}

        </div>

        <div className="chord-matrix-box">
          {_.range(32).map(function(elem, index) {
            return (
              <div className="button chord-matrix-button" key={elem} id={"pad" + elem}>
              </div>
            );
          })}
        </div>


      </div>



    )
  }
})

module.exports = App;
