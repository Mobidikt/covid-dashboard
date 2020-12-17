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

  return (
    <div className="App">
      <Header />
      <Main countries={countries} global={global} />
      <Footer />
    </div>
  )
}
export default App
