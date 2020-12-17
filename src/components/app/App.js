import React, { useEffect, useState } from 'react'
import './App.scss'
import Header from '../header'
import Footer from '../footer'
import Main from '../main'

import CovidService from '../../service/covid-service'

function App() {
  const [global, setGlobal] = useState([])
  const [countries, setCountries] = useState([])
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
  return (
    <div className="App">
      <Header setMode={switchMode} />
      <Main countries={countries} global={global} mode={mode} />
      <Footer />
    </div>
  )
}
export default App
