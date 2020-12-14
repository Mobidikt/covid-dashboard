import React, { Component } from 'react'
import './app.sass'

import CovidService from '../../service/covid-service'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  covidService = new CovidService()

  render() {
    // console.log(this.covidService.getListOfCountriesWithFlags())
    // console.log(this.covidService.getActualDate())
    // console.log(this.covidService.getListOfCountries())
    // console.log(this.covidService.getGlobalCases())
    return (
      <div>
        <h1>COVID19 Dashboard</h1>
      </div>
    )
  }
}

export default App
