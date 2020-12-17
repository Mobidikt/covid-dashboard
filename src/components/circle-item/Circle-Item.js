import PropTypes from 'prop-types'
import React from 'react'
import { CircleMarker, Popup } from 'react-leaflet'
import calculateTotalRadius from '../../utils/calculateTotalRadius'
import './Circle-Item.scss'

const options = {
  confirmed: { fillColor: 'crimson', color: 'none', fillOpacity: '.6' },
  deaths: { fillColor: 'white', color: 'none', fillOpacity: '.6' },
  recovered: { fillColor: 'green', color: 'none', fillOpacity: '.6' },
}

function CircleItem({ center, mode, zoom, country }) {
  function calculationForRad(item) {
    return calculateTotalRadius(item[mode.time][mode.state]) * zoom
  }

  return (
    <>
      <CircleMarker
        center={center}
        pathOptions={options[mode.state]}
        radius={calculationForRad(country)}
      >
        <Popup>
          <h1>{`${country.name}`}</h1>
          <p className="popup-subtitle">
            {`${mode.time} ${mode.state}: `}
            <span className="popup-subtitle-number">
              {`${country[mode.time][mode.state]}`}
            </span>
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
  zoom: PropTypes.number.isRequired,
  country: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

export default CircleItem
