import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import CountUp from 'react-countup'
import React, { useEffect, useMemo, useState } from 'react'
import calculationPopulation from '../../utils/calculationPopulation'
import Country from '../country'
import './List.scss'
import World from '../world/World'

function List({
  global,
  countries,
  mode,
  onClickCountry,
  currentCountry,
  resetCurrentCountry,
}) {
  const [isWorld, setIsWorld] = useState(true)
  const countryOrWorld =
    Object.keys(currentCountry).length === 0 ? global : currentCountry
  const stateCount = mode.isPopulation
    ? calculationPopulation(
        countryOrWorld[mode.time][mode.state],
        countryOrWorld
      )
    : countryOrWorld[mode.time][mode.state]
  const stateCountWorld = mode.isPopulation
    ? calculationPopulation(global[mode.time][mode.state], global)
    : global[mode.time][mode.state]
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
  }, [mode, countries])
  const colorText = useMemo(() => {
    if (mode.state === 'confirmed') {
      return 'orange'
    }
    if (mode.state === 'deaths') {
      return 'red'
    }
    return 'blue'
  }, [mode])
  const onWorld = () => {
    resetCurrentCountry()
  }
  useEffect(() => {
    if (countryOrWorld.name === 'World') {
      return setIsWorld(false)
    }
    return setIsWorld(true)
  }, [countryOrWorld])
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
          start={0.0}
          style={{ color: colorText }}
          end={stateCount}
          duration={2}
          separator="."
          decimal=","
          decimals={mode.isPopulation ? 3 : 0}
        />
      </Typography>
      <ul className="list__countries">
        {isWorld ? (
          <World
            count={stateCountWorld}
            country={global.name}
            onClick={onWorld}
            key={global.name}
            flag={global.flag}
            colorText={colorText}
            decimals={mode.isPopulation}
          />
        ) : (
          <></>
        )}

        {sortCountries.map((country) => (
          <Country
            count={
              mode.isPopulation
                ? calculationPopulation(country[mode.time][mode.state], country)
                : country[mode.time][mode.state]
            }
            decimals={mode.isPopulation}
            country={country.name}
            onClick={onClick}
            key={country.name}
            flag={country.flag}
            colorText={colorText}
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
    name: PropTypes.string,
    flag: PropTypes.string,
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
  resetCurrentCountry: PropTypes.func.isRequired,
}
export default List
