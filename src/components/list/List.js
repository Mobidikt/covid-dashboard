import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import CountUp from 'react-countup'
import React, { useMemo } from 'react'
import calculationPopulation from '../../utils/calculationPopulation'
import Country from '../country'
// import { world } from '../../constants/constants'
import './List.scss'

function List({ global, countries, mode, onClickCountry, currentCountry }) {
  const countryOrWorld =
    Object.keys(currentCountry).length === 0 ? global : currentCountry
  const stateCount = mode.isPopulation
    ? calculationPopulation(
        countryOrWorld[mode.time][mode.state],
        countryOrWorld
      )
    : countryOrWorld[mode.time][mode.state]
  const onClick = (country) => {
    onClickCountry(country)
  }
  const sortCountries = useMemo(() => {
    return countries.sort((a, b) => {
      if (mode.isPopulation) {
        return (
          calculationPopulation(b[mode.time][mode.state], b) -
          calculationPopulation(a[mode.time][mode.state], a)
        )
      }
      return b[mode.time][mode.state] - a[mode.time][mode.state]
    })
  }, [mode, countries, currentCountry])

  const colorText = useMemo(() => {
    if (mode.state === 'confirmed') {
      return 'orange'
    }
    if (mode.state === 'deaths') {
      return 'red'
    }
    return 'blue'
  }, [mode])
  return (
    <div className="list-container">
      <Typography className="list__title" variant="h6" component="h2">
        <img
          src={countryOrWorld.flag}
          className="list__title_flag"
          alt={`${countryOrWorld.name} flag`}
        />
        {countryOrWorld.name}
        <CountUp
          start={0}
          style={{ color: colorText }}
          end={stateCount}
          duration={2}
          separator="."
        />
      </Typography>
      <ul className="list__countries">
        {sortCountries.map((country) => (
          <Country
            count={
              mode.isPopulation
                ? Math.round(
                    calculationPopulation(
                      country[mode.time][mode.state],
                      country
                    )
                  )
                : country[mode.time][mode.state]
            }
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
List.defaultProps = {
  global: {},
}
List.propTypes = {
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
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickCountry: PropTypes.func.isRequired,
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
  currentCountry: PropTypes.shape({
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
    name: PropTypes.string,
    population: PropTypes.number,
  }).isRequired,
}
export default List
