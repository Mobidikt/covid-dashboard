import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import './Selector.scss'

const useStyles = makeStyles(() => ({
  lable: {
    display: 'flex',
    flexDirection: 'column',
    color: '#ffffff',
  },
  selector: {
    color: '#ffffff',
  },
}))

function Selector({ lableText, values, mode, setMode }) {
  const classes = useStyles()
  const stats = (event) => {
    setMode(event.target.value)
  }
  return (
    <>
      <InputLabel className={classes.lable} htmlFor="selector">
        {lableText}
        <Select
          className={classes.selector}
          value={mode}
          onChange={stats}
          id="selector"
        >
          {values.map((item) => (
            <MenuItem defaultValue="" value={item.value} key={item.value}>
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
  setMode: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.number.isRequired,
}

export default Selector
