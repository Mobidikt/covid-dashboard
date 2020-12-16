import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(() => ({
  country__flag: {
    height: '20px',
    width: '30px',
    marginRight: '10px',
  },
  item: {
    display: 'block',
  },
}))
function Country({ country, onClick, flag, count }) {
  const classes = useStyles()
  const handleClick = useCallback(() => {
    onClick(country)
  }, [onClick, country])
  return (
    <ListItem button onClick={handleClick}>
      <img
        src={flag}
        className={classes.country__flag}
        alt={`${country} flag`}
      />
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
