const path = require('path');
const logger = require('debug');
const webpack = require('webpack');
const config = require('./webpack.config.base.js');
const ExtractCSS = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  devtool: 'none',
  performance: {
    hints: false
  },
  cache: false,
  entry: {
    bundle: path.join(__dirname, '../src/entry.js')
  },
  output: {
    filename: '[name]-[hash:8].js',
    path: path.join(__dirname, '../static'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js'
  }
});

// Production plugins for old browsers
//------------------------------------
// config.module.rules.forEach(loader => {
//   if (loader.rule === 'babel-loader') {
//     loader.query.plugins.push(
//     )
//   }
// });

logger('server:webpack')('Environment: Production');

// Save files to disk
//-------------------------------
config.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      unsafe: true, // EXPERIMENTAL
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false
    }
  }),
  new ExtractCSS({ filename: '[name]-[contenthash:8].css', allChunks: true }),
  new webpack.DefinePlugin({
    'process.env.DEV': false,
    'process.env.BROWSER': true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    DEBUG: false
  }),
  new ManifestPlugin({
    fileName: 'build-manifest.json'
  })
].concat(config.plugins);

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
  throw new Error('Using "eval" source-maps may break the build');
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config);

compiler.run(function(err, stats) {
  if (err) throw err;

  // Output stats
  console.log(
    stats.toString({
      colors: true,
      hash: false,
      chunks: false,
      version: false,
      children: false,
      chunkModules: false
    })
  );

  // Write a stats.json for the webpack bundle visualizer
  writeWebpackStats(stats);

  if (stats.hasErrors()) {
    logger('webpack:error')(stats.compilation.errors.toString());
  }
  logger('webpack:compiler')('Finished compiling');
});

/**
 * Writes a stats.json for the webpack bundle visualizer
 * URL: https://chrisbateman.github.io/webpack-visualizer/
 * @param stats
 */
function writeWebpackStats(stats) {
  const { resolve } = require('path');
  const location = resolve(config.output.path, 'stats.json');
  require('fs').writeFileSync(location, JSON.stringify(stats.toJson()));
  logger('webpack:compiler')(`Wrote stats.json to ${location}`);
}
