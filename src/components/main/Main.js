import React from 'react'
import PropTypes from 'prop-types'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'
import './Main.scss'

function Main({
  mode,
  countries,
  global,
  currentCountry,
  resetCurrentCountry,
  chooseCountry,
  center,
}) {
  // const [currentCountry, setCurrentCountry] = useState({})

  return (
    <section className="root">
      <div className="root-items-container">
        <Table global={global} mode={mode} currentCountry={currentCountry} />
        <List
          global={global}
          countries={countries}
          mode={mode}
          onClickCountry={chooseCountry}
          currentCountry={currentCountry}
          resetCurrentCountry={resetCurrentCountry}
        />
      </div>
      <div className="root-items-container">
        <Map
          countries={countries}
          mode={mode}
          center={center}
          onClickCountry={chooseCountry}
        />
        <Chart global={global} mode={mode} currentCountry={currentCountry} />
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
}
export default Main
