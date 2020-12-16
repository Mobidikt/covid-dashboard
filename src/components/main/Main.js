import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Navigation from '../navigation'
import DataContainer from '../data-container'

function Main({ countries }) {
  const [mode, setMode] = useState({
    time: 'total',
    state: 'confirmed',
    isPopulation: false,
  })

  const switchMode = (data) => {
    setMode(data)
  }

  return (
    <>
      <Navigation setMode={switchMode} />
      <DataContainer mode={mode} countries={countries} />
    </>
  )
}
Main.defaultProps = {
  countries: [],
}
Main.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
}

export default Main
