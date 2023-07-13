import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from './home'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}
