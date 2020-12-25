import PropTypes from 'prop-types'
import React from 'react'
import CircleItem from '../circle-item'

function CircleList({ countries, mode, onClick }) {
  const lifted = (country) => onClick(country)

  return countries.map((country) => (
    <CircleItem
      key={country.name}
      center={country.latlng}
      mode={mode}
      country={country}
      onClick={lifted}
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
  onClick: PropTypes.func.isRequired,
}

export default CircleList
