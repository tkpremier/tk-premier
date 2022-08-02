/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const DotEnv = require('dotenv-webpack');

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
    pathinfo: true,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules|stories)/,
        use: 'ts-loader'
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: 'ts-loader'
      }
    ]
  },
  externals: [nodeExternals()],
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
  plugins: [new DotEnv()]
};
