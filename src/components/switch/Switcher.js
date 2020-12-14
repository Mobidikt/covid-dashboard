import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  switch: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function Switcher({ population, setPopulation }) {
  const classes = useStyles()

  const handleChange = () => {
    setPopulation(!population)
  }

  return (
    <FormGroup>
      <FormControlLabel
        className={classes.switch}
        label="per 100 thousand population"
        control={
          <Switch checked={population} onChange={handleChange} name="per100" />
        }
      />
    </FormGroup>
  )
}

Switcher.propTypes = {
  population: PropTypes.bool.isRequired,
  setPopulation: PropTypes.func.isRequired,
}
export default Switcher
