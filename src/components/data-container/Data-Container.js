import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'

import './Data-Container.scss'

function DataContainer({ mode, countries }) {
  const [currentCountry, setCurrentCountry] = useState({})
  const chooseCountry = (country) => {
    for (let i = 0; i < countries.length; i += 1) {
      if (countries[i].name === country) return setCurrentCountry(countries[i])
    }
    return {}
  }
  console.log(currentCountry)
  return (
    <section className="root">
      <List countries={countries} mode={mode} onClickCountry={chooseCountry} />
      <Map />
      <Table />
      <Chart />
    </section>
  )
}
DataContainer.defaultProps = {
  countries: [],
}
DataContainer.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}
export default DataContainer
