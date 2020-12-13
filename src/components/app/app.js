import React, { useState } from 'react'
import Navigation from '../navigation/Navigation'
import './app.sass'

function App() {
  const [indicator, setIndicator] = useState('casesGlobal')
  const changeIndicator = (data) => {
    setIndicator(data)
  }
  return (
    <div>
      <h1>COVID19 Dashboard</h1>
      <Navigation indicator={indicator} setIndicator={changeIndicator} />
    </div>
  )
}

export default App
