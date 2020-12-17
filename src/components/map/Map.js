import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import CircleItem from '../circle-item'
import './Map.scss'

const initPosition = [0, 0]
const initZoom = 2

function Map({ countries, mode }) {
  const [zoom] = useState(initZoom)

  const circleItems = countries.map((country) => (
    <CircleItem
      key={country.code}
      center={country.latlng}
      mode={mode}
      zoom={zoom}
      country={country}
    />
  ))

  return (
    <MapContainer
      center={initPosition}
      zoom={zoom}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/grenzen/ckirhkfl87oyc17qvkp1sgtkz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3JlbnplbiIsImEiOiJja2lybWIzbHgwYnphMnhzY3FjenNpMWVlIn0.uY0lYtXyU7JXDle3D600ew"
      />
      {circleItems}
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
}

export default Map
