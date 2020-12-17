import { useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { grades, getDiameter } from '../../constants/mapConstants'
import calculateTotalRadius from '../../utils/calculateTotalRadius'

import './Legend.scss'

function Legend() {
  const map = useMap()
  const [color] = useState('#FFFFFF')
  let isToggleLegend = false

  const getColor = () => {
    return color
  }

  const getSize = (el) => {
    const extractedNumber = +el.split(' ').pop()
    return getDiameter(getDiameter(calculateTotalRadius(extractedNumber)))
  }

  const legend = L.control({ position: 'topright' })
  const legendButton = L.control({ position: 'topright' })

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
  const toggleEvent = () => {
    isToggleLegend = !isToggleLegend
    // eslint-disable-next-line no-unused-expressions
    isToggleLegend ? legend.addTo(map) : legend.remove(map)
  }

  legendButton.onAdd = () => {
    const button = L.DomUtil.create('button', 'legend-button')
    button.innerHTML = 'L'
    button.addEventListener('click', toggleEvent)
    return button
  }
  legendButton.addTo(map)
  return null
}

export default Legend
