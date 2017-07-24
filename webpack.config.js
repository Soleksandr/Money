const path = require('path');

const distDir = path.join(__dirname, 'static');

module.exports = {
  entry: './src/index',
  output: {
    path: `${distDir}/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }],
  },
};
