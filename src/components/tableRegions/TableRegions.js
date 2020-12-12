import React from 'react'
// import './TableRegions.sass'

function Table({ country }) {
  return (
    <div className="table-regions">
      <h3 className>Statistics by region of the {country}</h3>
      <Region />
    </div>
  )
}
export default Table
