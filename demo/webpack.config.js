// var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for local development and testing.
 * Since the HTML WebPack plugin is used, no files are actually generated;
 * everything is handled by the development server.
 * It contains local-specific configuration including:
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  devtool: 'inline-source-map',

  entry: './demo/demo',

  //   fs.readdirSync(__dirname).reduce(function (entries, dir) {
  //   // if (fs.statSync(path.join(__dirname, dir)).isDirectory()) {
  //   //   entries[dir] = path.join(__dirname, dir, 'index.js');
  //   // }
  //   return entries
  // }, {}),

  output: {
    path: __dirname + '/__build__',
    filename: 'demo.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin("demo.css")
  ],

  module: {
    loaders: [
      { test: /\.md$/, loader: 'raw' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
    ]
  },

  resolve: {
    alias: {
      'react-markdown-editor-modal': path.join(__dirname, '..', 'src')
    }
  }
};
