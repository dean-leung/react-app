'use strict'

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const appDir = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDir, relativePath)

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: [resolveApp('src/main.tsx')],

  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.ejs')
    })
  ],

  resolve: {
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.js', '.ts', '.tsx']
  }
}
