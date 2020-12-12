import React, { Component } from 'react'
import Country from './Country'
import './ListCountries.sass'

function ListCountries(props) {
  return (
    <ul className="place__list">
      {props.Countrys.map((country) => (
        <Country country={country} onClick={props.onCoutryClick} />
      ))}
    </ul>
  )
}
export default ListCountries
