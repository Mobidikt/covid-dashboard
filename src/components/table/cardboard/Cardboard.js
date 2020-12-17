import React from 'react'
import './Cardboard.scss'
import CountUp from 'react-countup'
import PropTypes from 'prop-types'
import { Grid, Card, Typography, CardContent } from '@material-ui/core/'

function Cardboard({ title, count, modeTime, titleColor }) {
  const modeLabel =
    modeTime === 'total' ? 'for the whole peridor' : 'for the last day'
  return (
    <Grid item component={Card}>
      <CardContent className="card">
        <div className="card-title">
          <Typography variant="h6" component="h2" style={{ color: titleColor }}>
            {title}
          </Typography>
          <div className="card-title-information">
            <Typography
              className="card-title-information__count"
              variant="body2"
            >
              <CountUp start={0} end={count} duration={2} separator="." />
            </Typography>
            <Typography variant="body2">{modeLabel}</Typography>
          </div>
        </div>
        <div className="card-regions">
          <Typography>Список регионов</Typography>
        </div>
      </CardContent>
    </Grid>
  )
}

Cardboard.defaultProps = {
  title: '',
  count: 0,
  modeTime: '',
  titleColor: '',
}

Cardboard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  modeTime: PropTypes.string,
  titleColor: PropTypes.string,
}

export default Cardboard
