import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'

import './Data-Container.scss'
import { initPosition } from '../../constants/mapConstants'

function DataContainer({ mode, countries }) {
  const [currentCountry, setCurrentCountry] = useState({})
  const [center, setCenter] = useState(initPosition)
  console.log(currentCountry)

  const chooseCountry = (country) => {
    const pointCountry = countries.find((el) => el.name === country)
    setCenter(() => pointCountry.latlng)
    return setCurrentCountry(pointCountry)
  }

  return (
    <section className="root">
      <List countries={countries} mode={mode} onClickCountry={chooseCountry} />
      <Map countries={countries} mode={mode} center={center} />
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
