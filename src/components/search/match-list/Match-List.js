import React from 'react'
import PropTypes from 'prop-types'
import MatchItem from './match-item'

const MatchList = ({ text, liftedMatch, matches }) => {
  const matched = (country) => liftedMatch(country)
  return (
    <datalist id="countrySearch">
      {matches.map((match) => (
        <MatchItem
          key={match.code}
          match={match}
          text={text}
          matched={matched}
        />
      ))}
    </datalist>
  )
}

MatchList.propTypes = {
  text: PropTypes.string.isRequired,
  liftedMatch: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MatchList
