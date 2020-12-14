import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  NAV_TEXT,
  metricFirst,
  metricSecond,
  PER100,
} from '../../utils/navigationConstants'
import Selector from '../selector/Selector'
import Switcher from '../switch/Switcher'

const useStyles = makeStyles(() => ({
  navigation: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  navigation__menu: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  navigation__selectors: { display: 'flex', justifyContent: 'space-between' },
}))

function Navigation({ indicator, setIndicator }) {
  const classes = useStyles()
  const [navTitle, setNavTitle] = useState('casesGlobal')
  const [population, setPopulation] = useState(false)
  const renderTextNav = (data) => {
    setNavTitle(data)
  }

  const stats = (data) => {
    setIndicator(data)
    renderTextNav(data)
  }
  const renderFromPopulation = (data) => {
    setPopulation(data)
    stats(indicator)
  }
  return (
    <section className={classes.navigation}>
      <Typography className={classes.title} variant="h3">
        {NAV_TEXT[navTitle]}
        {population ? PER100 : ''}
      </Typography>
      <div className={classes.navigation__menu}>
        <div className={classes.navigation__selectors}>
          <Selector
            lableText="Global statistics"
            values={metricFirst}
            indicator={indicator}
            setIndicator={stats}
          />
          <Selector
            lableText="Statistics in the last day"
            values={metricSecond}
            indicator={indicator}
            setIndicator={stats}
          />
        </div>
        <Switcher
          population={population}
          setPopulation={renderFromPopulation}
        />
      </div>
    </section>
  )
}

Navigation.propTypes = {
  indicator: PropTypes.string.isRequired,
  setIndicator: PropTypes.func.isRequired,
}
export default Navigation
