import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import './Switcher.scss'

function Switcher({ lableText, state, switchState }) {
  const handleChange = () => {
    switchState(!state)
  }

  return (
    <FormGroup>
      <FormControlLabel
        className="switcher-switch"
        label={lableText}
        control={<Switch checked={state} onChange={handleChange} name="per" />}
      />
    </FormGroup>
  )
}
Switcher.defaultProps = {
  lableText: '',
}
Switcher.propTypes = {
  lableText: PropTypes.string,
  state: PropTypes.bool.isRequired,
  switchState: PropTypes.func.isRequired,
}
export default Switcher
