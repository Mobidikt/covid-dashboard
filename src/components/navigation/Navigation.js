import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  NAV_TEXT,
  metricFirst,
  metricSecond,
  PER100,
  arr,
} from '../../constants/navigationConstants'

import Selector from '../selector'
import Switcher from '../switcher'

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

function Navigation({ setMode }) {
  const classes = useStyles()
  const [isOnPopulation, setIsOnPopulation] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    if (isOnPopulation) {
      setMode({
        time: arr[id].time,
        state: arr[id].state,
        isPopulation: isOnPopulation,
      })
    } else {
      setMode({
        time: arr[id].time,
        state: arr[id].state,
        isPopulation: isOnPopulation,
      })
    }
  }, [isOnPopulation, id])

  const stats = (value) => {
    setId(value)
  }
  const renderFromPopulation = (value) => {
    setIsOnPopulation(value)
  }
  return (
    <section className={classes.navigation}>
      <Typography className={classes.title} variant="h4">
        {NAV_TEXT[id]}
        {isOnPopulation ? PER100 : ''}
      </Typography>
      <div className={classes.navigation__menu}>
        <div className={classes.navigation__selectors}>
          <Selector
            lableText="Global statistics"
            values={metricFirst}
            mode={id}
            setMode={stats}
          />
          <Selector
            lableText="Statistics in the last day"
            values={metricSecond}
            mode={id}
            setMode={stats}
          />
        </div>
        <Switcher
          isPopulation={isOnPopulation}
          setIsPopulation={renderFromPopulation}
        />
      </div>
    </section>
  )
}

Navigation.propTypes = {
  setMode: PropTypes.func.isRequired,
}
export default Navigation
