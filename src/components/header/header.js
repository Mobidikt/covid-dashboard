import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    cursor: 'pointer',
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar className={classes.header}>
          <Typography className={classes.title} variant="h5">
            Covid19 Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
