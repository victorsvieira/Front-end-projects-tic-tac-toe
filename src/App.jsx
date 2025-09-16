import { useState } from 'react'

import './App.css'
import Square from './components/Square'
import Game from './components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Game/>
    
    </>
  )
}

export default App
