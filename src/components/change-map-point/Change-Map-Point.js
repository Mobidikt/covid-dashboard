import { useMap } from 'react-leaflet'

export default function ChangeMapPoint({ center, zoom }) {
  const map = useMap()
  if (zoom < 3) map.setZoom(zoom + 1)
  map.setView(center, map.getZoom())
  return null
}
