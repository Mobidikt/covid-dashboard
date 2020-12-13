import React from 'react'
import PropTypes from 'prop-types'

function Selector({ lableText, values, indicator, setIndicator }) {
  const stats = (event) => {
    setIndicator(event.target.value)
  }
  return (
    <label>
      {lableText}
      <select value={indicator} onChange={stats}>
        {values.map((item) => (
          <option value={item.value} key={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </label>
  )
}

Selector.propTypes = {
  lableText: PropTypes.string.isRequired,
  setIndicator: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  indicator: PropTypes.string.isRequired,
}

export default Selector
