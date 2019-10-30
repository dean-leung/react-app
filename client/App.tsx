import React, { useState } from 'react'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="react-ssr-demo">
      <h1>React SSR Demo</h1>
      <div className="counter">
        <button onClick={handleClick}>Click Me</button>
        <div className="count">{count}</div>
      </div>
    </div>
  )
}

export default App
