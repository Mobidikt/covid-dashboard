import React from 'react'
import './Table.scss'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core/'
import Cardboard from './cardboard'
import calculationPopulation from '../../utils/calculationPopulation'

function Table({ global, mode, currentCountry }) {
  const countryOrWorld =
    Object.keys(currentCountry).length === 0 ? global : currentCountry

  if (!countryOrWorld) {
    return 'loading...'
  }

  const modeTime = mode.time

  const confirmedCount = mode.isPopulation
    ? calculationPopulation(countryOrWorld[modeTime].confirmed, countryOrWorld)
    : countryOrWorld[modeTime].confirmed
  const deathsCount = mode.isPopulation
    ? calculationPopulation(countryOrWorld[modeTime].deaths, countryOrWorld)
    : countryOrWorld[modeTime].deaths
  const recoveredCount = mode.isPopulation
    ? calculationPopulation(countryOrWorld[modeTime].recovered, countryOrWorld)
    : countryOrWorld[modeTime].recovered

  return (
    <div className="table-container">
      <Grid container>
        <Cardboard
          title="Confirmed"
          count={confirmedCount}
          modeTime={modeTime}
          titleColor="orange"
        />
        <Cardboard
          title="Deaths"
          count={deathsCount}
          modeTime={modeTime}
          titleColor="red"
        />
        <Cardboard
          title="Recovered"
          count={recoveredCount}
          modeTime={modeTime}
          titleColor="blue"
        />
      </Grid>
    </div>
  )
}

Table.defaultProps = {
  global: {},
}
Table.propTypes = {
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
    population: PropTypes.number,
  }).isRequired,
}

export default Table
