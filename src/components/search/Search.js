import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import MatchList from './match-list'
import './Search.scss'

const Search = ({ countries, onSearchChange }) => {
  const [matches, setMatches] = useState([])

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
    if (match) onSearchChange(match)
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
  onSearchChange: PropTypes.func.isRequired,
}

export default Search
