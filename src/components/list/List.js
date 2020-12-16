import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import Country from '../country'
import './List.scss'

function List({ countries, mode, onClickCountry }) {
  const onClick = (country) => {
    onClickCountry(country)
  }
  const sortCountries = useMemo(() => {
    return countries.sort((a, b) => {
      return b[mode.time][mode.state] - a[mode.time][mode.state]
    })
  }, [mode, countries])
  return (
    <div className="list-container">
      <h3>List</h3>
      <ul className="countries__list">
        {sortCountries.map((country) => (
          <Country
            count={country[mode.time][mode.state]}
            country={country.name}
            onClick={onClick}
            key={country.name}
            flag={country.flag}
          />
        ))}
      </ul>
    </div>
  )
}

List.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickCountry: PropTypes.func.isRequired,
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}
export default List
