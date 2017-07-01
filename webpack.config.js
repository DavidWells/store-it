const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      // Loaders for other file types can go here
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
       // {output}/file.txt
       { from: 'README.md' },
       { from: 'package.json' },
    ])
  ]
};
