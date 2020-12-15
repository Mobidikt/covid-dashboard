import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Search from '../search/Search'

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
          <Search />
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
