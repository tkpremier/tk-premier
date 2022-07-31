/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    server: './src/app.ts'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    library: 'ssr',
    path: resolve(__dirname, 'dist'),
    publicPath: '/assets',
    pathinfo: true
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
  target: 'node',
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
