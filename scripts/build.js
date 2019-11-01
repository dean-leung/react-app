'use strict'

const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.prod')

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // TODO: 处理错误

    console.log(
      chalk.red('出错啦')
    )
  }

  if (stats.hasWarnings()) {
    // TODO: 处理警告
  }

  console.log(stats)
})
