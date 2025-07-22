import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Game from './components/Game/Game'

function App() {

  return (
    <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
  )
}

export default App
