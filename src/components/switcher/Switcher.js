import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import './Switcher.scss'

function Switcher({ isPopulation, setIsPopulation }) {
  const handleChange = () => {
    setIsPopulation(!isPopulation)
  }

  return (
    <FormGroup>
      <FormControlLabel
        className="switcher-switch"
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
