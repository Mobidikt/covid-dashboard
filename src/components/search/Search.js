import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import MatchList from './match-list'
import './Search.scss'

const Search = ({ countries, liftMatchToApp }) => {
  const [matches, setMatches] = useState([])
  const [text, setText] = useState('')

  const countryFilter = (wordToMatch) =>
    countries.filter((country) => {
      const reg = new RegExp(wordToMatch, 'gi')
      return country.name.match(reg)
    })

  function findMatches(e) {
    const { value } = e.target
    setText(value)
    const array = countryFilter(value)
    setMatches(() => array)
  }

  const liftedMatch = (country) => liftMatchToApp(country)

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
      <MatchList text={text} liftedMatch={liftedMatch} matches={matches} />
    </>
  )
}

Search.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  liftMatchToApp: PropTypes.func.isRequired,
}

export default Search
