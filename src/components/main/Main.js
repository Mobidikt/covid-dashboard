/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'
import ErrorBoundary from '../error-boundary'
import './Main.scss'

function Main({
  mode,
  countries,
  global,
  currentCountry,
  resetCurrentCountry,
  chooseCountry,
  center,
  isError,
  response,
}) {
  return (
    <section className="root">
      <div className="root-items-container">
        <ErrorBoundary isError={isError} response={response}>
          <Table global={global} mode={mode} currentCountry={currentCountry} />
        </ErrorBoundary>
        <ErrorBoundary isError={isError} response={response}>
          <List
            global={global}
            countries={countries}
            mode={mode}
            onClickCountry={chooseCountry}
            currentCountry={currentCountry}
            resetCurrentCountry={resetCurrentCountry}
          />
        </ErrorBoundary>
      </div>
      <div className="root-items-container">
        <ErrorBoundary isError={isError} response={response}>
          <Map
            countries={countries}
            mode={mode}
            center={center}
            onClickCountry={chooseCountry}
          />
        </ErrorBoundary>
        <ErrorBoundary isError={isError} response={response}>
          <Chart global={global} mode={mode} currentCountry={currentCountry} />
        </ErrorBoundary>
      </div>
    </section>
  )
}
Main.defaultProps = {
  global: {},
}
Main.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
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
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  chooseCountry: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  response: PropTypes.string.isRequired,
}
export default Main
