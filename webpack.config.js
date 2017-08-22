const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/static/dist',
        }),
      },
      {
        test: /.woff$|.woff2$|.ttf$|.eot$|.svg$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ],
};
