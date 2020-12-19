import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  NAV_TEXT,
  metricFirst,
  PER100,
  arr,
} from '../../constants/navigationConstants'

import './Header.scss'
import Search from '../search'
import Selector from '../selector'
import Switcher from '../switcher'

const Header = ({ setMode, countries, matchInApp }) => {
  const [isOnPopulation, setIsOnPopulation] = useState(false)
  const [isLastDay, setIsLastDay] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    if (isLastDay) {
      setMode({
        time: 'new',
        state: arr[id].state,
        isPopulation: isOnPopulation,
      })
    } else {
      setMode({
        time: 'total',
        state: arr[id].state,
        isPopulation: isOnPopulation,
      })
    }
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
  const liftMatchToApp = (country) => matchInApp(country)

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
            {isOnPopulation ? PER100 : ''}
          </h1>
          <Search countries={countries} liftMatchToApp={liftMatchToApp} />
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
            isPopulation={isLastDay}
            setIsPopulation={renderStateLastDay}
          />
          <Switcher
            lableText="per 100.000"
            isPopulation={isOnPopulation}
            setIsPopulation={renderFromPopulation}
          />
        </div>
      </AppBar>
    </header>
  )
}
Header.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMode: PropTypes.func.isRequired,
  matchInApp: PropTypes.func.isRequired,
}

export default Header
