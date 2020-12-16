import React, { useState } from 'react'
import Navigation from '../navigation'
import DataContainer from '../data-container'

function Main() {
  const [mode, setMode] = useState({
    time: 'total',
    state: 'confirmed',
    isPopulation: false,
  })
  const switchMode = (data) => {
    setMode(data)
  }
  console.log(mode)
  return (
    <>
      <Navigation setMode={switchMode} />
      <DataContainer />
    </>
  )
}

export default Main
