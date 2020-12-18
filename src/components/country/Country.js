import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './Country.scss'

function Country({ country, onClick, flag, count }) {
  const handleClick = () => {
    onClick(country)
  }
  return (
    <ListItem button onClick={handleClick}>
      <img src={flag} className="country-flag" alt={`${country} flag`} />
      <ListItemText primary={` ${count} ${country}`} />
    </ListItem>
  )
}
Country.defaultProps = {
  flag: '',
}
Country.propTypes = {
  country: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  flag: PropTypes.string,
}
export default Country
