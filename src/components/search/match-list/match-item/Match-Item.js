import React from 'react'
import PropTypes from 'prop-types'

const MatchItem = ({ match, text, matched }) => {
  const click = (() => {
    if (text !== match.name) return
    matched(match)
  })()
  return (
    <option className="search-option" onMouseDown={click}>
      {match.name}
    </option>
  )
}

MatchItem.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  matched: PropTypes.func.isRequired,
}

export default MatchItem
