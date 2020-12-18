import PropTypes from 'prop-types'
import React from 'react'
import CircleItem from '../circle-item'

function CircleList({ countries, mode }) {
  return countries.map((country) => (
    <CircleItem
      key={country.code}
      center={country.latlng}
      mode={mode}
      country={country}
    />
  ))
}

CircleList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}

export default CircleList
