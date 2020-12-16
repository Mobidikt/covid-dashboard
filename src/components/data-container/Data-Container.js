import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import Map from '../map'
import List from '../list'
import Table from '../table'
import Chart from '../chart'

import './Data-Container.scss'

function DataContainer() {
  return (
    <section className="root">
      <List />
      <Map />
      <Table />
      <Chart />
    </section>
  )
}

export default DataContainer
