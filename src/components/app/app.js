import React, { useEffect, useState } from 'react'
import ListCountries from '../listCountries/ListCountries'
import './app.sass'

// eslint-disable-next-line react/prefer-stateless-function
function App() {
  const [countries, setCountries] = useState(['Russia', 'US'])
  const [countryTarget, setCountryTarget] = useState([])
  const [flags, setFlags] = useState([])
  useEffect(() => {
    setCountries(['Russia', 'US'])
  }, [])
  useEffect(() => {
    setFlags(['Russia', 'US'])
  }, [])
  const clickCountryTarget = (country) => {
    console.log(country)
    setCountryTarget(country)
  }
  return (
    <div>
      <h1>COVID19 Dashboard</h1>
      <ListCountries
        countries={countries}
        flags={flags}
        onClickCountry={clickCountryTarget}
        countryTarget={countryTarget}
      />
    </div>
  )
}

export default App
