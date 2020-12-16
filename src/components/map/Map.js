import React from 'react'
import './Map.scss'
import { MapContainer, TileLayer } from 'react-leaflet'

const position = [0, 0]

function Map() {
  return (
    <MapContainer center={position} zoom={1} className="map-container">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
