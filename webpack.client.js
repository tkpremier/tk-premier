const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

/**
 * dist
 * output: {
    filename: '[name].bundle.js',
    library: 'ssr',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets',
    pathinfo: true
  },
 */

module.exports = {
  entry: {
    algos: './src/data-structures/contiguous.js',
    client: './src/client.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  }
                }
              ],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['.js', '.jsx']
  },
  stats: {
    errorDetails: true,
    outputPath: true,
    publicPath: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin()
  ]
};
