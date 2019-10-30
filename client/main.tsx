import React, { useState } from 'react'
import { hydrate } from 'react-dom'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>React SSR Demo</h1>
      <div>
        <button onClick={handleClick}>Click Me</button>
        <div>{count}</div>
      </div>
    </div>
  )
}

// @ts-ignore
global.window = false

if (window) {
  hydrate(<App/>, document.getElementById('root'))
}

export default App
