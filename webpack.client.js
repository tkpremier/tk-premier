/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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

export default {
  entry: {
    algos: './src/data-structures/contiguous.ts',
    client: './src/client.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets')
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['.tsx', '.ts', '.js', '.jsx']
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
