'use strict'

const { resolveApp } = require('./utils')
const TerserJSPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',

  bail: true,

  devtool: 'source-map',

  entry: [resolveApp('src/main.tsx')],

  output: {
    filename: 'assets/js/[name].[hash:8].js',
    path: resolveApp('dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      // TODO: 使用 `oneOf`
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
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
        use: {
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
    })
  ],

  resolve: {
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.css', '.js', '.ts', '.tsx'],
    alias: {
      '@': resolveApp('src')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        verdor: {
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin()
    ]
  }
}
