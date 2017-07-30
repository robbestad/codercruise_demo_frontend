const webpack = require("webpack")
const isProd = process.env.NODE_ENV === "production"
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
const OfflinePlugin = require("offline-plugin")
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const config = require(path.join(__dirname, "..", "src", "config", "index"))

exports.HtmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin()
exports.HtmlWebpackExcludeAssetsPlugin = new HtmlWebpackExcludeAssetsPlugin()

exports.OfflinePlugin = new OfflinePlugin({
  caches: "all",
  safeToUseOptionalCaches: true,
  responseStrategy: "network-first", // 'cache-first' | 'network-first'
  updateStrategy: "changed", // 'changed' | 'all',
  appcache: true,
  // externals: ['assets/images/**.jpg', 'assets/images/thumb/**.jpg'],
  excludes: ["**/.*", "**/*.map"]
})

exports.SWPrecacheWebpackPlugin = new SWPrecacheWebpackPlugin({
  cacheId: 'codercruise-pwa',
  filename: 'images-service-worker.js',
  staticFileGlobs: [
    'src/assets/images/**/*',
    'assets/images/**/*',
  ],
  stripPrefix: 'src/', // stripPrefixMulti is also supported
  mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
  staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files
})

exports.HMRPlugin = new webpack.HotModuleReplacementPlugin()

exports.HtmlWebpackPlugin = new HtmlWebpackPlugin({
  title: config.title,
  template: "src/templates/default.hbs",
  inject: true,
  cache: false,
  appMountId: "root",
  minify: {
    removeComments: isProd,
    collapseWhitespace: isProd,
    conservativeCollapse: isProd,
    minifyJS: isProd,
    minifyCSS: isProd
  }
})

exports.CopyPlugin = new CopyWebpackPlugin(
  [{ from: "src/assets", to: "./assets" }],
  { ignore: ["**/*.css", "*.js", "fonts/unused/**/*"] },
  { copyUnmodified: isProd }
)

exports.ExtractPlugin = new ExtractTextPlugin("styles.css")

/* Production plugins *************************/

exports.EnvPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
})

exports.NamedModulesPlugin = new webpack.NamedModulesPlugin()

// exports.CommonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
// 	// name: "commonchunks",
// 	// minChunks: ({resource}) => /node_modules/.test(resource),
// 	name: "lodash-inferno-shared-bundle.js",
// 	minChunks: function(module, count) {
// 		return module.resource && /lodash|inferno/.test(module.resource) && count >= 1
// 	}
// })

function infernoMobxModuleFilter(module, count) {
  return module.resource && /mobx|inferno/.test(module.resource) && count >= 1
}
function utilsModuleFilter(module, count) {
  return module.resource && /lodash/.test(module.resource) && count >= 2
}
exports.CommonChunksInfernoPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: "mobx-inferno-shared-bundle.js",
  minChunks: infernoMobxModuleFilter
})
exports.CommonChunksUtilsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: "utils-shared-bundle.js",
  minChunks: utilsModuleFilter
})

exports.LoaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
})

exports.UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    drop_debugger: isProd,
    drop_console: isProd
  },
  output: {
    comments: false
  }
})

/* RULES *************************/

const babelRuleProd = {
  test: /\.jsx?$/,
  loader: "babel-loader",
  query: {
    presets: [],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      "transform-es2015-arrow-functions",
      "transform-es2015-block-scoped-functions",
      "transform-es2015-block-scoping",
      "transform-es2015-classes",
      "transform-es2015-computed-properties",
      "transform-es2015-destructuring",
      "transform-es2015-literals",
      "transform-es2015-modules-commonjs",
      "transform-es2015-parameters",
      "transform-es2015-shorthand-properties",
      "transform-es2015-spread",
      "transform-es2015-template-literals",
      "inferno",
      "fast-async",
      "transform-flow-strip-types"
    ]
  }
}

const babelRuleDev = {
  test: /\.jsx?$/,
  loader: "babel-loader",
  include: [path.join(__dirname, "..", "src")],
  query: {
    presets: [],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      "transform-es2015-arrow-functions",
      "transform-es2015-block-scoped-functions",
      "transform-es2015-block-scoping",
      "transform-es2015-classes",
      "transform-es2015-computed-properties",
      "transform-es2015-destructuring",
      "transform-es2015-literals",
      "transform-es2015-modules-commonjs",
      "transform-es2015-parameters",
      "transform-es2015-shorthand-properties",
      "transform-es2015-spread",
      "transform-es2015-template-literals",
      "inferno",
      "fast-async",
      "transform-flow-strip-types"
    ]
  }
}

exports.BabelRule = isProd ? babelRuleProd : babelRuleDev

exports.CSSRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: "css-loader?importLoaders=1!postcss-loader"
  })
}

exports.URLRule = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  use: "url-loader?limit=100000"
}

exports.HBSRule = {
  test: /\.hbs$/,
  use: "handlebars-loader"
}
