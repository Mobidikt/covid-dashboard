import React from 'react'
import PropTypes from 'prop-types'
import CountUp from 'react-countup'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './Country.scss'

function Country({ decimals, colorText, country, onClick, flag, count }) {
  const handleClick = () => {
    onClick(country)
  }
  return (
    <ListItem className="country" button onClick={handleClick}>
      <img src={flag} className="country-flag" alt={`${country} flag`} />
      <ListItemText primary={` ${country} `} />
      <CountUp
        start={0.0}
        style={{ color: colorText }}
        end={count}
        duration={2}
        separator="."
        decimal=","
        decimals={decimals ? 3 : 0}
      />
    </ListItem>
  )
}
Country.defaultProps = {
  flag: '',
}
Country.propTypes = {
  colorText: PropTypes.string.isRequired,
  decimals: PropTypes.bool.isRequired,
  country: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  flag: PropTypes.string,
}
export default Country
