import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Game from './components/Game/Game'
import Navbar from './components/Navbar/Navbar'
import Testing from './components/Testing/Testing'
import Results from './components/Results/Results'

function App() {
  const [wordCount, setWordCount] = useState(0);

  return (
    <Router>
       <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Game wordCount={wordCount} setWordCount={setWordCount} />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/results" element={<Results wordCount={wordCount} />} />
        </Routes>
      </Router>
  )
}

export default App
