const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development', // TODO: 其他模式

  entry: './server/index.ts',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },

  // TODO: 其他属性
})
