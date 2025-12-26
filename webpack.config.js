const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const DotEnv = require('dotenv-webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: NODE_ENV,
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
  plugins: [
    new DotEnv({
      systemvars: true, // let process.env override if present (e.g., Docker)
      silent: true // don't crash if file is missing
    })
  ]
};
