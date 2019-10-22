const paths = require('./paths')

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile')

  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/'

    return {
      mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development'
    }
}