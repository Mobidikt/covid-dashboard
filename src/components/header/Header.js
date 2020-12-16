import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Search from '../search'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '96%',
    maxWidth: '1280px',
    margin: '0 auto',
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
          <Search />
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
