import React, { Component } from 'react'
import './app.sass'
import Header from '../header/header'
import Footer from '../footer/footer'

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    )
  }
}

export default App
