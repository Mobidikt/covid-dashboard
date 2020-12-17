import PropTypes from 'prop-types'
import React from 'react'
import DataContainer from '../data-container'

function Main({ countries, mode }) {
  return (
    <>
      <DataContainer mode={mode} countries={countries} />
    </>
  )
}
Main.defaultProps = {
  countries: [],
}
Main.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
}

export default Main
