import React from 'react'
import PropTypes from 'prop-types'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import './Selector.scss'

function Selector({ lableText, values, mode, setMode }) {
  const stats = (event) => {
    setMode(event.target.value)
  }
  return (
    <>
      <InputLabel className="selector-container" htmlFor="selector">
        {lableText}
        <Select value={mode} onChange={stats} id="selector">
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
