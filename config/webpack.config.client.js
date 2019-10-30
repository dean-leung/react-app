const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = merge(baseConfig, {
  mode: 'development', // TODO: 支持其他模式

  entry: './client/main.tsx',

  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist/public')
  },

  // TODO: 其他属性
})
