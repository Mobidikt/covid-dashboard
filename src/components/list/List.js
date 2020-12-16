import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { List } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    margin: '20px 10px',
    width: '30%',
    height: '95%',
    backgroundColor: 'gray',
  },
}))

function List() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>List</h1>
    </div>
  )
}

export default List
