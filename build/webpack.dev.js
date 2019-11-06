'use strict'

const webpack = require('webpack')
const { resolveApp } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  devtool: 'clean-module-source-map', // 来自 `create-react-app`,

  entry: [resolveApp('src/main.tsx')],

  output: {
    filename: '[name].js',
    path: resolveApp('dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader' // TODO: postcss
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
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
              ['import', {
                'libraryName': 'antd',
                'libraryDirectory': 'es',
                'style': 'css' // `style: true` 会加载 less 文件
              }],
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.ejs'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.css', '.js', '.ts', '.tsx'],
    alias: {
      '@': resolveApp('src')
    }
  },

  devServer: {
    hot: true,
    contentBase: 'dist'
  },

  watchOptions: {
    ignored: /node_modules/
  }
}
