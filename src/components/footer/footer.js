import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import Date from '../date/Date'

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '130px',
    width: '100%',
    background: '#3f51b5',
    color: 'white',
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 25px',
  },
  logo: {
    height: '50px',
  },
  developer: {
    cursor: 'pointer',
    marginLeft: '15px',
  },
  courseBlock: {
    marginTop: '10px',
    textAlign: 'center',
    color: fade(theme.palette.common.white, 0.7),
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div>
          <Typography variant="h5">Developers:</Typography>
          <Typography className={classes.developer}>
            <Link
              href="https://github.com/Mobidikt"
              target="blank"
              color="inherit"
            >
              Mobidikt
            </Link>
          </Typography>
          <Typography className={classes.developer}>
            <Link
              href="https://github.com/Grenzen"
              target="blank"
              color="inherit"
            >
              Grenzen
            </Link>
          </Typography>
          <Typography className={classes.developer}>
            <Link
              href="https://github.com/IKLOA"
              target="blank"
              color="inherit"
            >
              IKLOA
            </Link>
          </Typography>
        </div>
        <div className={classes.courseBlock}>
          <Link href="https://rs.school/js/" target="blank">
            <img
              className={classes.logo}
              src="https://rs.school/images/rs_school_js.svg"
              alt="logoCourse"
            />
          </Link>
          <Typography>2020</Typography>
        </div>
        <Date />
      </div>
    </footer>
  )
}

export default Footer
