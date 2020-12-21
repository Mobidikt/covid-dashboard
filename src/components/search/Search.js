import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import MatchList from './match-list'
import './Search.scss'

// import Keyboard from '../../virtual-keyboard/js/Keyboard'
// import rowsOrder from '../../virtual-keyboard/js/constants/rowsOrder'
// import lang from '../../virtual-keyboard/js/constants/lang'

const Search = ({ countries, liftMatchToApp }) => {
  const [matches, setMatches] = useState([])
  // const keyboard = new Keyboard(rowsOrder).init(lang).generateLayout()
  // console.log(keyboard)

  const liftedMatch = (country) => liftMatchToApp(country)

  const countryFilter = (word) =>
    setMatches(() =>
      countries.filter((country) => {
        const reg = new RegExp(word, 'gi')
        return country.name.match(reg)
      })
    )

  function findMatches(e) {
    const { value } = e.target
    if (!value) return
    countryFilter(value)
    const match = matches.filter((el) => el.name === value).length
      ? matches.find((el) => el.name === value)
      : null
    if (match) liftedMatch(match)
  }

  return (
    <>
      <div className="search">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          placeholder="Search country"
          className="search-input"
          list="countrySearch"
          aria-label="search"
          onChange={findMatches}
        />
      </div>
      <MatchList matches={matches} />
    </>
  )
}

Search.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  liftMatchToApp: PropTypes.func.isRequired,
}

export default Search
