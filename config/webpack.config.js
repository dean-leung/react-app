const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile')

  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/'

  return {
    mode: isEnvProduction
      ? 'production'
      : isEnvDevelopment && 'development',

    bail: isEnvProduction,

    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts', '.tsx']
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'React APP',
        favicon: 'public/favicon.ico',
        template: 'public/index.html'
      }),
    ],
    
    stats: 'errors-only',

    devServer: {
      hot: true,
      clientLogLevel: 'error'
    }
  }
}
