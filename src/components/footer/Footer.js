import React from 'react'
import { Typography, Link } from '@material-ui/core'
import Date from '../date'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <Typography variant="h5">Developers:</Typography>
          <Typography className="footer-developer">
            <Link
              href="https://github.com/Mobidikt"
              target="blank"
              color="inherit"
            >
              Mobidikt
            </Link>
          </Typography>
          <Typography className="footer-developer">
            <Link
              href="https://github.com/Grenzen"
              target="blank"
              color="inherit"
            >
              Grenzen
            </Link>
          </Typography>
          <Typography className="footer-developer">
            <Link
              href="https://github.com/IKLOA"
              target="blank"
              color="inherit"
            >
              IKLOA
            </Link>
          </Typography>
        </div>
        <div className="footer-course-block">
          <Link href="https://rs.school/js/" target="blank">
            <img
              className="footer-logo"
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
