const express = require('express')
const app = express()
const config = require('./webpack.config')
const webpack = require('webpack')
const compiler = webpack(config)
const path = require('path')

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

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/../index.html')
    const publicPath = express.static(path.join(__dirname, '../public'))

    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
