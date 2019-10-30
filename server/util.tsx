import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/App'

export default () => {
  let html = fs.readFileSync('./static/index.html', { encoding: 'utf8' })

  html = html.replace('<!-- ssr-content -->', renderToString(<App/>))

  return html
}
