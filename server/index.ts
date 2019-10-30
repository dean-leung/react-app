import http from 'http'
import chalk from 'chalk'
import express from 'express'
import renderer from './util'

const app = express()

app.use(express.static('dist/public'))

app.use('*', (request, response) => {
  console.log(
    '[',
    chalk.blue('INFO'),
    ']',
    chalk.green(request.method),
    chalk.yellow(request.path)
  )
  const html = renderer()
  response.send(html)
  return
})

http
  .createServer(app)
  .listen(8084, () => {
    console.log(
      chalk.blue('server is running...')
    )
  })
