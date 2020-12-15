import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  country__flag: {
    height: '20px',
    width: '30px',
  },
  item: {
    display: 'block',
  },
}))

function Country({ country, onClick, flag, count }) {
  const classes = useStyles()
  const handleClick = useCallback(() => {
    console.log('11')
    onClick(country)
  }, [onClick, country])
  return (
    <button type="button" className={classes.item} onClick={handleClick}>
      <img
        src={flag}
        className={classes.country__flag}
        alt={`${country} flag`}
      />
      <span className={classes.country__number}>{` ${count} `}</span>
      <span className={classes.country__name}>{country}</span>
    </button>
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
