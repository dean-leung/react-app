/**
 * utils
 */

const fs = require('fs')
const path = require('path')

const appDir = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDir, relativePath)

module.exports = {
  appDir,
  resolveApp
}
