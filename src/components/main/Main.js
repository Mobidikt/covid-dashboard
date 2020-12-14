import React, { useState } from 'react'
import Navigation from '../navigation/Navigation'

function Main() {
  const [mode, setMode] = useState('casesGlobal')
  const switchMode = (data) => {
    setMode(data)
  }
  return <Navigation mode={mode} setMode={switchMode} />
}

export default Main
