import React, { Component } from 'react'
import './App.sass'
import Header from '../header'
import Footer from '../footer'
import Main from '../main'

import CovidService from '../../service/covid-service'
// eslint-disable-next-line react/prefer-stateless-function

class App extends Component {
  covidService = new CovidService()

  // eslint-disable-next-line react/state-in-constructor
  state = {
    global: null,
  }

  componentDidMount() {
    this.covidService.getGlobalCases().then((global) => {
      this.setState({
        global,
      })
    })
    this.covidService.getListOfCountriesWithFlags().then((countries) => {
      this.setState({
        countries,
      })
    })
  }

  render() {
    const { global, countries } = this.state
    // console.log(this.covidService.getActualDate())
    // console.log(this.covidService.getListOfCountries())
    // console.log(this.covidService.getGlobalCases())
    return (
      <div className="App">
        <Header />
        <Main countries={countries} global={global} />
        <Footer />
      </div>
    )
  }
}
export default App
