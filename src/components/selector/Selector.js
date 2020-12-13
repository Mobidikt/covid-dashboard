import React from 'react'

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
export default Selector
