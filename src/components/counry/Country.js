import React from 'react'
import './Country.sass'

function Country({ country, onClick }) {
  function handleClick() {
    onClick(country)
  }
  return (
    <li className="" onClick={handleClick}>
      <span className="country__number">Number</span>
      <span className="country__name">{country}</span>
      <span className="country__flag">FlagCountry</span>
    </li>
  )
}
export default Country
