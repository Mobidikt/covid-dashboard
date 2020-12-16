import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Map from '../map'
import List from '../list'
import Table from '../table'
// import Chart from '../chart'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '52vh',
  },
}))

function DataContainer() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <List />
      <Map />
      <Table />
    </section>
  )
}

export default DataContainer
