import React, { useEffect, useState } from 'react'
import './App.scss'
import Header from '../header'
import Footer from '../footer'
import Main from '../main'
import { initPosition } from '../../constants/mapConstants'
import errorAppearance from '../../utils/errorAppearance'

import CovidService from '../../service/covid-service'

const covidService = new CovidService()

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
  const [currentCountry, setCurrentCountry] = useState({})
  const [center, setCenter] = useState(initPosition)
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState('')

  useEffect(() => {
    covidService
      .getGlobalCases()
      .then((globalStatistics) => {
        setGlobal(globalStatistics)
      })
      .catch((error) => {
        const arr = errorAppearance(error)
        setIsError(Boolean(arr.shift()))
        setResponse(arr.join(': '))
      })
  }, [])

  useEffect(() => {
    covidService
      .getListOfCountriesWithFlags()
      .then((allCountriesInfo) => {
        setCountries(allCountriesInfo)
      })
      .catch((error) => {
        const arr = errorAppearance(error)
        setIsError(Boolean(arr.shift()))
        setResponse(arr.join(': '))
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
  const onSearchChange = (country) =>
    Object.keys(country).length ? setCurrentCountry(country) : null
  const chooseCountry = (country) => {
    const pointCountry = countries.find((el) => el.name === country)
      ? countries.find((el) => el.name === country)
      : countries.find((el) => el.name === country.name)
    setCenter(pointCountry.latlng)
    return setCurrentCountry(pointCountry)
  }
  const resetCurrentCountry = () => {
    return setCurrentCountry({})
  }
  useEffect(() => {
    if (Object.keys(currentCountry).length) chooseCountry(currentCountry)
  }, [currentCountry])
  return (
    <div className="App">
      <Header
        setMode={switchMode}
        countries={countries}
        onSearchChange={onSearchChange}
      />
      <Main
        countries={countries}
        global={global}
        mode={mode}
        currentCountry={currentCountry}
        resetCurrentCountry={resetCurrentCountry}
        chooseCountry={chooseCountry}
        center={center}
        isError={isError}
        response={response}
      />
      <Footer />
    </div>
  )
}
export default App
