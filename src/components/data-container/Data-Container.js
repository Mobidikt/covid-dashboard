import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'

import './Data-Container.scss'

function DataContainer({ mode, countries, global }) {
  const [currentCountry, setCurrentCountry] = useState({})
  const chooseCountry = (country) => {
    for (let i = 0; i < countries.length; i += 1) {
      if (countries[i].name === country) return setCurrentCountry(countries[i])
    }
    return {}
  }
  return (
    <section className="root">
      <List countries={countries} mode={mode} onClickCountry={chooseCountry} />
      <Map />
      <Table global={global} mode={mode} currentCountry={currentCountry} />
      <Chart />
    </section>
  )
}
DataContainer.defaultProps = {
  countries: [],
  global: {},
}
DataContainer.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  global: PropTypes.shape({
    total: PropTypes.shape({
      confirmed: PropTypes.number,
      deaths: PropTypes.number,
      recovered: PropTypes.number,
    }),
    new: PropTypes.shape({
      confirmed: PropTypes.number,
      deaths: PropTypes.number,
      recovered: PropTypes.number,
    }),
    population: PropTypes.number,
  }),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}
export default DataContainer
