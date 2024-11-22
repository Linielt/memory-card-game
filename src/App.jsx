import { useState } from 'react'
import './App.css'
import ScoreBoard from './components/ScoreBoard'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <main className='app'>
      <header>
        <div className='game-info'>
          <div className='game-title'>
            <h1>Memory Game</h1>
          </div>
          <p>Get points by clicking on a card but do not click on any more than once.</p>
        </div>
        <ScoreBoard score={score} highScore={highScore}></ScoreBoard>
      </header>
    </main>
  )
}

export default App
