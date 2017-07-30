const isProd = process.env.NODE_ENV === "production";
const path = require("path");

const {
  CommonChunksInfernoPlugin,
  CommonChunksUtilsPlugin,
  HMRPlugin,
  NamedModulesPlugin,
  HtmlWebpackPlugin,
  SWPrecacheWebpackPlugin,
  CopyPlugin,
  OfflinePlugin,
  BabelRule,
  CSSRule,
  URLRule,
  HBSRule
} = require(path.join(__dirname, "webpack.plugins"));

module.exports = {
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "..", isProd ? "static" : "build"),
    publicPath: "/",
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: [
    CommonChunksInfernoPlugin,
    CommonChunksUtilsPlugin,
    HMRPlugin,
    NamedModulesPlugin,
    HtmlWebpackPlugin,
    SWPrecacheWebpackPlugin,
    CopyPlugin,
    OfflinePlugin
  ],
  module: {
    rules: [BabelRule, CSSRule, URLRule, HBSRule]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      core: path.join(__dirname, "..", "core")
    }
  }
};
