import React from 'react'

import './App.css'
import { AppRoutes } from './teamstarter/pages/AppRoute'

function App() {
  return (
    <div id="hero" className="hero">
      <h1 className="title">To Do List</h1>
      <AppRoutes />
    </div>
  )
}

export default App
