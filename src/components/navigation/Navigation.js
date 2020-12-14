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
    marginTop: '64px',
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

function Navigation({ mode, setMode }) {
  const classes = useStyles()
  const [navTitle, setNavTitle] = useState('casesGlobal')
  const [isPopulation, setIsPopulation] = useState(false)
  const renderTextNav = (data) => {
    setNavTitle(data)
  }

  const stats = (data) => {
    setMode(data)
    renderTextNav(data)
  }
  const renderFromPopulation = (data) => {
    setIsPopulation(data)
    stats(mode)
  }
  return (
    <section className={classes.navigation}>
      <Typography className={classes.title} variant="h4">
        {NAV_TEXT[navTitle]}
        {isPopulation ? PER100 : ''}
      </Typography>
      <div className={classes.navigation__menu}>
        <div className={classes.navigation__selectors}>
          <Selector
            lableText="Global statistics"
            values={metricFirst}
            mode={mode}
            setMode={stats}
          />
          <Selector
            lableText="Statistics in the last day"
            values={metricSecond}
            mode={mode}
            setMode={stats}
          />
        </div>
        <Switcher
          isPopulation={isPopulation}
          setIsPopulation={renderFromPopulation}
        />
      </div>
    </section>
  )
}

Navigation.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
}
export default Navigation
