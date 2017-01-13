var webpack = require('webpack');

module.exports = {
  entry: ['webpack-hot-middleware/client','./src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot','babel'],
      include: __dirname + '/src'
    }, {
      test: /\.s?css$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
}
