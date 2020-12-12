import React from 'react'
// import './Country.sass'

function Table({ country }) {
  function handleClick() {
    onClick(country)
  }
  return (
    <div className="table">
      <h3 className="table__title">Global Cases</h3>
      <p className="table__subtitle">Количество</p>
      <TableRegions country={country} />
    </div>
  )
}
export default Table
