import React from 'react'
import Country from '../counry/Country'
import './ListCountries.sass'

function ListCountries({ countries, flags, onClickCountry, countryTarget }) {
  //country нужен чтоб подсвечивать страну (или убрать потом)
  const onClick = (country) => {
    onClickCountry(country)
  }
  return (
    <div className="listCountries">
      <h3 className="listCountries__title">
        Cases by Country/Region/Sovereignty
      </h3>
      <ul className="countries__list">
        {countries.map((country) => (
          <Country
            country={country}
            onClick={onClick}
            key={country}
            flag={flags[0]}
          />
        ))}
      </ul>
    </div>
  )
}
export default ListCountries
