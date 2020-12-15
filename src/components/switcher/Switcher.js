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

function Switcher({ isPopulation, setIsPopulation }) {
  const classes = useStyles()

  const handleChange = () => {
    setIsPopulation(!isPopulation)
  }

  return (
    <FormGroup>
      <FormControlLabel
        className={classes.switch}
        label="per 100.000 population"
        control={
          <Switch checked={isPopulation} onChange={handleChange} name="per" />
        }
      />
    </FormGroup>
  )
}

Switcher.propTypes = {
  isPopulation: PropTypes.bool.isRequired,
  setIsPopulation: PropTypes.func.isRequired,
}
export default Switcher
