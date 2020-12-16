import React, { Component } from 'react'
import './App.scss'
import Header from '../header'
import Footer from '../footer'
import Main from '../main'

import CovidService from '../../service/covid-service'

class App extends Component {
  covidService = new CovidService()

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
export default App
