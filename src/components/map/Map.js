import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import CircleList from '../circle-list'
import Legend from '../legend'
import ChangeMapPoint from '../change-map-point'

import './Map.scss'
import { initZoom } from '../../constants/mapConstants'

function Map({ countries, mode, center, onClickCountry }) {
  const [zoom] = useState(initZoom)
  const [legend] = useState(<Legend />)
  const chooseCountryInMap = (country) => onClickCountry(country)

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      minZoom={1}
      className="map-container"
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/grenzen/ckirhkfl87oyc17qvkp1sgtkz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3JlbnplbiIsImEiOiJja2lybWIzbHgwYnphMnhzY3FjenNpMWVlIn0.uY0lYtXyU7JXDle3D600ew"
      />
      <ChangeMapPoint center={center} zoom={zoom} />
      <CircleList
        countries={countries}
        mode={mode}
        onClick={chooseCountryInMap}
      />
      {legend}
    </MapContainer>
  )
}

Map.defaultProps = {
  countries: [],
}
Map.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.shape({
    time: PropTypes.string,
    state: PropTypes.string,
    isPopulation: PropTypes.bool,
  }).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClickCountry: PropTypes.func.isRequired,
}

export default Map
