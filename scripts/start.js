'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
// process.env.HOST = '1.1.1.1'

process.on('unhandledRejection', err => {
  throw err
})

// 读取环境变量
require('../config/env')
console.log('读取环境变量成功')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
  choosePort,
  createCompiler,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpackDevServer.config')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  console.log('缺少必要文件')
  process.exit(1)
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `尝试绑定 HOST 环境变量：${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
}

const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT)
  })
  .then(port => {
    if (port == null) {
      return
    }

    const config = configFactory('development')
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name
    const useTypescript = fs.existsSync(paths.appTsConfig)
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
    const urls = prepareUrls(protocol, HOST, port)
    const devSocket = {
      warnings: warnings =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: errors =>
        devServer.sockWrite(devServer.sockets, 'errors', errors)
    }

    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypescript,
      tscCompileOnError,
      webpack
    })

    const serverConfig = createDevServerConfig(
      urls.lanUrlForConfig
    )

    const devServer = new WebpackDevServer(compiler, serverConfig)
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }
      console.log('Dev Server is running')
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
