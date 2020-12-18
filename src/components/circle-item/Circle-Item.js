/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { CircleMarker, Popup } from 'react-leaflet'
import calculateTotalRadius from '../../utils/calculateTotalRadius'
import calculationPopulation from '../../utils/calculationPopulation'
import './Circle-Item.scss'
import { options, getDiameter } from '../../constants/mapConstants'

function CircleItem({ center, mode, country, onClick }) {
  const handleClick = useMemo(() => ({
    click() {
      onClick(country)
    },
  }))
  function calculationForRad(item) {
    const calculatedRadius = getDiameter(
      calculateTotalRadius(item[mode.time][mode.state])
    )
    return mode.isPopulation ? getDiameter(calculatedRadius) : calculatedRadius
  }

  const num = mode.isPopulation
    ? calculationPopulation(country[mode.time][mode.state], country).toFixed()
    : country[mode.time][mode.state]

  return (
    <>
      <CircleMarker
        center={center}
        pathOptions={options[mode.state]}
        radius={calculationForRad(country)}
        eventHandlers={handleClick}
      >
        <Popup>
          <h1>{`${country.name}`}</h1>
          <p className="popup-subtitle">
            {`${mode.time} ${mode.state}: `}
            <span className="popup-subtitle-number">{`${num}`}</span>
          </p>
        </Popup>
      </CircleMarker>
    </>
  )
}

CircleItem.propTypes = {
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  country: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CircleItem
