var express = require('express');
var app = express();
var config = require('./webpack.config');
var webpack = require('webpack');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('listening at http://localhost:3000');
});