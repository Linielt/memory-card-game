import { useState } from 'react'
import './App.css'
import ScoreBoard from './components/ScoreBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app'>
      <header>
        <div class='game-info'>
          <h1>Memory Game</h1>
          <p>Get points by clicking on a card but do not click on any more than once.</p>
        </div>
        <ScoreBoard></ScoreBoard>
      </header>
    </main>
  )
}

export default App
