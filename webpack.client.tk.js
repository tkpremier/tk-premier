const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
  clientside entries:
    auctionPage: './auctionPageClient.entry',
    buyNow: './buyNow.entry',
    homepage: './homepage.entry',
    lotPage: './LotPage.entry',
*/
const entries = {
  home: '../entries/home.client.jsx',
  lotpage: '../entries/lot.client.jsx'
};

module.exports = {
  context: path.join(__dirname, 'tk/src/react'),
  entry: entries,
  stats: {
    errorDetails: true
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  output: {
    filename: '[name].client.js',
    path: path.resolve(__dirname, 'tk/dist'),
    publicPath: '/dist',
    pathinfo: true
  },
  module: {
    rules: [
      // Transform JSX in .jsx files
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                    node: 'current'
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              'lodash',
              'syntax-async-functions',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-object-assign',
              '@babel/plugin-proposal-optional-chaining'
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
                    browsers: ['last 2 versions', 'safari >= 7'],
                    node: 'current'
                  }
                }
              ]
            ],
            plugins: [
              'lodash',
              'syntax-async-functions',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-object-assign',
              '@babel/plugin-proposal-optional-chaining'
            ]
          }
        }
      },
      {
        test: /\.scss/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['.js', '.jsx']
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin({
      cloning: true,
      collections: true,
      currying: true,
      flattening: true
    })
  ]
};
