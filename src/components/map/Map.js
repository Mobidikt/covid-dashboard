import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MapContainer, TileLayer } from 'react-leaflet'

const useStyles = makeStyles(() => ({
  root: {
    margin: '20px 10px',
    width: '40%',
    height: '95%',
  },
}))

const position = [0, 0]

function Map() {
  const classes = useStyles()
  return (
    <MapContainer center={position} zoom={1} className={classes.root}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
