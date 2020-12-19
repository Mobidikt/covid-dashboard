import React, { useEffect, useState } from 'react'
import './Chart.scss'
import PropTypes from 'prop-types'
import { Line, Bar } from 'react-chartjs-2'
import CovidService from '../../service/covid-service'

const Chart = ({ global, mode, currentCountry }) => {
  const [dailyWorldData, setWorldDailyData] = useState([])
  const [dailyCountryData, setDailyCountryData] = useState([])
  const covidService = new CovidService()
  const modeTime = mode.time

  useEffect(() => {
    covidService.getCasesForWorldDaily().then((data) => {
      setWorldDailyData(data)
    })
  }, [])

  useEffect(() => {
    if (Object.keys(currentCountry).length !== 0) {
      covidService.getCasesForCountryDaily(currentCountry.slug).then((data) => {
        setDailyCountryData(data)
      })
    } else
      covidService.getCasesForWorldDaily().then((data) => {
        setDailyCountryData(data)
      })
  }, [currentCountry])

  const dailyCountryOrWorld = dailyCountryData.length
    ? dailyCountryData
    : dailyWorldData

  const countryOrWorld =
    Object.keys(currentCountry).length === 0 ? global : currentCountry

  if (!countryOrWorld) {
    return 'loading...'
  }

  const lineChart =
    modeTime === 'total' ? (
      <Line
        data={{
          labels: dailyCountryOrWorld.map(({ date }) => date),
          datasets: [
            {
              data: dailyCountryOrWorld.map(({ confirmed }) => confirmed),
              label: 'Confirmed',
              borderColor: 'orange',
              fill: true,
            },
            {
              data: dailyCountryOrWorld.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              fill: true,
            },
            {
              data: dailyCountryOrWorld.map(({ deaths }) => deaths),
              label: 'Recovered',
              borderColor: 'blue',
              fill: true,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Current state in ${
              currentCountry.name ? currentCountry.name : 'world'
            }`,
          },
        }}
      />
    ) : (
      <Bar
        data={{
          labels: ['Confirmed', 'Deaths', 'Recovered'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['orange', 'red', 'blue'],
              data: [
                countryOrWorld.new.confirmed,
                countryOrWorld.new.deaths,
                countryOrWorld.new.recovered,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Current state in ${
              currentCountry.name ? currentCountry.name : 'world'
            }`,
          },
        }}
      />
    )

  return <div className="chart-container">{lineChart}</div>
}

Chart.defaultProps = {
  global: {},
}
Chart.propTypes = {
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
    slug: PropTypes.string,
    name: PropTypes.string,
    population: PropTypes.number,
  }).isRequired,
}

export default Chart
