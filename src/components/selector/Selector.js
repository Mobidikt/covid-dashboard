import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(() => ({
  selector: {
    marginRight: '20px',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

function Selector({ lableText, values, indicator, setIndicator }) {
  const classes = useStyles()
  const stats = (event) => {
    setIndicator(event.target.value)
  }
  return (
    <>
      <InputLabel className={classes.selector} htmlFor={indicator}>
        {lableText}
        <Select value={indicator} onChange={stats} id={indicator}>
          {values.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </InputLabel>
    </>
  )
}

Selector.propTypes = {
  lableText: PropTypes.string.isRequired,
  setIndicator: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  indicator: PropTypes.string.isRequired,
}

export default Selector
