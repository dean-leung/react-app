'use strict'

const webpack = require('webpack')
// const merge = require('webpack-merge')
// const common = require('./webpack.common')
const TerserJSPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { resolveApp } = require('./utils')

module.exports = {
  mode: 'production',

  // bail: true,

  // devtool: 'source-map',

  entry: {
    app: resolveApp('src/main.tsx')
  },

  output: {
    filename: 'assets/js/[name].[hash].js',
    path: resolveApp('dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      // {
      //   oneOf: [
      //     {

      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.ejs'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      }
    }),
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.ejs'),
      filename: 'about/index.html',
      minify: {
        collapseWhitespace: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash].css",
      chunkFilename: "assets/css/[id].[hash].css"
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: /^\**!|@preserve|@license/,
    // })
  ],

  resolve: {
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': resolveApp('src')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  // TODO
}
