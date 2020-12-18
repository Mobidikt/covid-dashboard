import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'

import './Data-Container.scss'
import { initPosition } from '../../constants/mapConstants'

function DataContainer({ mode, countries, global }) {
  const [currentCountry, setCurrentCountry] = useState({})
  const [center, setCenter] = useState(initPosition)
  console.log(currentCountry)
  const chooseCountry = (country) => {
    const pointCountry = countries.find((el) => el.name === country)
      ? countries.find((el) => el.name === country)
      : countries.find((el) => el.name === country.name)
    setCenter(() => pointCountry.latlng)
    return setCurrentCountry(pointCountry)
  }
  return (
    <section className="root">
      <List
        global={global}
        countries={countries}
        mode={mode}
        onClickCountry={chooseCountry}
        currentCountry={currentCountry}
      />
      <Map
        countries={countries}
        mode={mode}
        center={center}
        onClickCountry={chooseCountry}
      />
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
