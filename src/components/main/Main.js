import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Navigation from '../navigation'
import DataContainer from '../data-container'

function Main({ countries, global }) {
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
      <DataContainer mode={mode} countries={countries} global={global} />
    </>
  )
}
Main.defaultProps = {
  countries: [],
  global: {},
}
Main.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  global: PropTypes.shape({
    total: PropTypes.shape({
      confirmed: PropTypes.number,
      deaths: PropTypes.number,
      recovered: PropTypes.number,
    }),
    new: PropTypes.shape({
      confirmed: PropTypes.number,
      deaths: PropTypes.number,
      recovered: PropTypes.number,
    }),
    population: PropTypes.number,
  }),
}

export default Main
