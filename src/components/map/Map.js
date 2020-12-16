import React from 'react'
import './Map.scss'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

const position = [0, 0]

function Map() {
  const options = { fillColor: 'red', color: 'none' }
  return (
    <MapContainer center={position} zoom={1} className="map-container">
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/grenzen/ckirhkfl87oyc17qvkp1sgtkz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3JlbnplbiIsImEiOiJja2lybWIzbHgwYnphMnhzY3FjenNpMWVlIn0.uY0lYtXyU7JXDle3D600ew"
      />
      <CircleMarker center={[51.51, -0.12]} pathOptions={options} radius={30}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
    </MapContainer>
  )
}

export default Map
