import React, { useEffect, useState } from 'react'
import './App.scss'
import Header from '../header'
import Footer from '../footer'
import Main from '../main'

import CovidService from '../../service/covid-service'

function App() {
  const [global, setGlobal] = useState({
    total: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    },
    new: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    },
    name: 'World',
    flag: '',
    population: 0,
  })
  const [countries, setCountries] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [matchFromSearch, setMatchFromSearch] = useState({})
  const covidService = new CovidService()
  useEffect(() => {
    covidService.getGlobalCases().then((globalStatistics) => {
      setGlobal(globalStatistics)
    })
  }, [])
  useEffect(() => {
    covidService.getListOfCountriesWithFlags().then((allCountriesInfo) => {
      setCountries(allCountriesInfo)
    })
  }, [])
  const [mode, setMode] = useState({
    time: 'total',
    state: 'confirmed',
    isPopulation: false,
  })
  const switchMode = (data) => {
    setMode(data)
  }

  const matchInApp = (country) =>
    Object.keys(country).length ? setMatchFromSearch(country) : null
  return (
    <div className="App">
      <Header
        setMode={switchMode}
        countries={countries}
        matchInApp={matchInApp}
      />
      <Main
        countries={countries}
        global={global}
        mode={mode}
        matchFromSearch={matchFromSearch}
      />
      <Footer />
    </div>
  )
}
export default App
