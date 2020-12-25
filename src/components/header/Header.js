import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  NAV_TEXT,
  metricFirst,
  PER_HUNDRED_THOUSAND,
  indicator,
} from '../../constants/navigationConstants'

import './Header.scss'
import Search from '../search'
import Selector from '../selector'
import Switcher from '../switcher'

const Header = ({ setMode, countries, onSearchChange }) => {
  const [isOnPopulation, setIsOnPopulation] = useState(false)
  const [isLastDay, setIsLastDay] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    setMode({
      time: isLastDay ? 'new' : 'total',
      state: indicator[id],
      isPopulation: isOnPopulation,
    })
  }, [isOnPopulation, id, isLastDay])

  const stats = (value) => {
    setId(value)
  }
  const renderFromPopulation = (value) => {
    setIsOnPopulation(value)
  }
  const renderStateLastDay = (value) => {
    setIsLastDay(value)
  }

  return (
    <header>
      <AppBar className="header" position="fixed">
        <Toolbar className="header__toolbar">
          <Typography className="header__logo" variant="h5">
            Covid19 Dashboard
          </Typography>
          <h1 className="header__title">
            {isLastDay ? 'Last day ' : 'Global '}
            {NAV_TEXT[id]}
            {isOnPopulation ? PER_HUNDRED_THOUSAND : ''}
          </h1>
          <Search countries={countries} onSearchChange={onSearchChange} />
        </Toolbar>
        <div className="header__menu">
          <Selector
            lableText="Global statistics"
            values={metricFirst}
            mode={id}
            setMode={stats}
          />
          <Switcher
            lableText="Last day"
            state={isLastDay}
            switchState={renderStateLastDay}
          />
          <Switcher
            lableText="per 100.000"
            state={isOnPopulation}
            switchState={renderFromPopulation}
          />
        </div>
      </AppBar>
    </header>
  )
}
Header.propTypes = {
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
  setMode: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default Header
