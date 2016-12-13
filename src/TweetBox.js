var React = require('react');
require('./TweetBox.css');

var TweetBox = React.createClass({

  getInitialState: function() {
    return {
      content: '',
      maxTweetLength: this.props.maxTweetLength
    }
  },

  handleChange: function(event) {
    this.setState({ content: event.target.value });
  },

  render: function() {
    // var maxTweetLength = this.state.maxTweetLength;
    // var content = this.state.content;

    var { content, maxTweetLength } = this.state; // destructuring
    var isDisabled = content.length <= 0 || content.length > maxTweetLength

    var spanStyle = content.length > maxTweetLength ? { color: 'red' } : {}

    // if (content.length > maxTweetLength) {
    //   var spanClass = 'warning'
    // } else {
    //   var spanClass = ''
    // }

    var spanClass = content.length > maxTweetLength ? 'warning' : ''

    return (
      <div>
        <textarea onChange={this.handleChange}></textarea>
        <button disabled={isDisabled}>tweet</button>
        <span className={spanClass}>
          {maxTweetLength - content.length}
        </span>
      </div>
    )
  }
})

module.exports = TweetBox;