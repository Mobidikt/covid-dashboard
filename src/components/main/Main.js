import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import ListCountries from '../ListCountries/ListCountries'
import Navigation from '../navigation/Navigation'

function Main({ countries }) {
  const [mode, setMode] = useState({
    time: 'total',
    state: 'confirmed',
    isPopulation: false,
  })
  const switchMode = (data) => {
    setMode(data)
  }
  const sortCountries = useMemo(() => {
    return countries.sort(function (a, b) {
      return b[mode.time][mode.state] - a[mode.time][mode.state]
    })
  }, [mode, countries])
  return (
    <>
      <Navigation setMode={switchMode} />
      <div>
        <ListCountries countries={sortCountries} mode={mode} />
      </div>
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
