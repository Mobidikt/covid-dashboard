import { useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { grades, getDiameter } from '../../constants/mapConstants'
import calculateTotalRadius from '../../utils/calculateTotalRadius'

import './Legend.scss'

function Legend() {
  const map = useMap()
  const [color] = useState('#FFFFFF')

  const getColor = () => {
    return color
  }

  const getSize = (el) => {
    const extractedNumber = +el.split(' ').pop()
    return getDiameter(getDiameter(calculateTotalRadius(extractedNumber)))
  }

  const legend = L.control({ position: 'topright' })

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend')
    const labels = []

    grades.map((el) =>
      labels.push(
        `<div><i style="background-color:${getColor()}; width:${getSize(
          el
        )}px; height:${getSize(el)}px"></i> &gt; ${el}</div>`
      )
    )
    div.innerHTML = labels.join('')
    return div
  }
  legend.addTo(map)
  return null
}

export default Legend
