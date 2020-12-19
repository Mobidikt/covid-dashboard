import PropTypes from 'prop-types'
import React from 'react'
import DataContainer from '../data-container'

function Main({ countries, mode, global, matchFromSearch }) {
  return (
    <>
      <DataContainer
        mode={mode}
        countries={countries}
        global={global}
        matchFromSearch={matchFromSearch}
      />
    </>
  )
}
Main.defaultProps = {
  countries: [],
  global: {},
}
Main.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
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
  matchFromSearch: PropTypes.shape({}).isRequired,
}

export default Main
