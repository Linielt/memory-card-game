import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app'>
      <header>
        <h1>Memory Game</h1>
        <p>Get points by clicking on a card but do not click on any more than once.</p>
      </header>
    </main>
  )
}

export default App
