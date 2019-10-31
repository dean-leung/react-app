'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./utils')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  output: {
    filename: 'js/[name].js',
    path: resolveApp('dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  devServer: {
    hot: true,
    contentBase: 'dist'
  }

  // TODO
})
