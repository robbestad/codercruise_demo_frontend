const path = require('path');
const webpack = require('webpack');
const config = require(path.join(__dirname, 'webpack.config.base.js'));
process.traceDeprecation = true;

const {
  ExtractPlugin
} = require(path.join(__dirname, 'webpack.plugins'));

Object.assign(config, {
  cache: true,
  devtool: 'source-map',
  performance: {
    hints: false
  },
  entry: [
    './src/entry.js'
  ],
  output: {
    filename: '[name]-[hash:8].js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js'
  }
});

config.plugins.push(
  ExtractPlugin,
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: true
  })
);

module.exports = config;
