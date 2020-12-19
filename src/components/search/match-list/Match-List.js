import React from 'react'
import PropTypes from 'prop-types'
import MatchItem from './match-item'

const MatchList = ({ matches }) => {
  return (
    <datalist id="countrySearch">
      {matches.map((match) => (
        <MatchItem key={match.code} match={match} />
      ))}
    </datalist>
  )
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MatchList
