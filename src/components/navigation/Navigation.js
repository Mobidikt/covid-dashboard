import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  NAV_TEXT,
  metricFirst,
  metricSecond,
  metricThird,
  metricFourth,
} from '../../utils/navigationConstants'
import Selector from '../selector/Selector'

function Navigation({ indicator, setIndicator }) {
  const [navTitle, setNavTitle] = useState('casesGlobal')
  const stats = (data) => {
    setIndicator(data)
    setNavTitle(data)
  }
  return (
    <div>
      <h2>{NAV_TEXT[navTitle]}</h2>
      <Selector
        lableText="Global statistics"
        values={metricFirst}
        indicator={indicator}
        setIndicator={stats}
      />
      <Selector
        lableText="Global statistics per 100 thousand population"
        values={metricSecond}
        indicator={indicator}
        setIndicator={stats}
      />
      <Selector
        lableText="Statistics in the last day"
        values={metricThird}
        indicator={indicator}
        setIndicator={stats}
      />
      <Selector
        lableText="Statistics in the last day per 100 thousand population"
        values={metricFourth}
        indicator={indicator}
        setIndicator={stats}
      />
    </div>
  )
}

Navigation.propTypes = {
  indicator: PropTypes.string.isRequired,
  setIndicator: PropTypes.func.isRequired,
}
export default Navigation
