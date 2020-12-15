import PropTypes from 'prop-types'
import React from 'react'
import Country from '../counry'
import './ListCountries.sass'

function ListCountries({ countries, mode }) {
  const onClick = (country) => {
    onClickCountry(country)
  }
  return (
    <div className="listCountries">
      <h3 className="listCountries__title">
        Cases by Country/Region/Sovereignty
      </h3>
      <ul className="countries__list">
        {countries.map((country) => (
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

ListCountries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}
export default ListCountries
