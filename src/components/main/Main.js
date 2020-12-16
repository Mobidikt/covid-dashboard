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
  const [currentCountry, setCurrentCountry] = useState({})
  console.log(currentCountry)
  const switchMode = (data) => {
    setMode(data)
  }
  const chooseCountry = (country) => {
    for (let i = 0; i < countries.length; i += 1) {
      if (countries[i].name === country) return setCurrentCountry(countries[i])
    }
    return {}
  }
  const sortCountries = useMemo(() => {
    return countries.sort((a, b) => {
      return b[mode.time][mode.state] - a[mode.time][mode.state]
    })
  }, [mode, countries])
  return (
    <>
      <Navigation setMode={switchMode} />
      <div>
        <ListCountries
          countries={sortCountries}
          mode={mode}
          onClickCountry={chooseCountry}
        />
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
