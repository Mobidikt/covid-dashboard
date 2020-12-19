import React from 'react'
import PropTypes from 'prop-types'

const MatchItem = ({ match }) => {
  return <option className="search-option">{match.name}</option>
}

MatchItem.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
}

export default MatchItem
