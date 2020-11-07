import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, children, cancelLabel, id }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <span>
      <span style={hideWhenVisible}>
        <button className={id} onClick={toggleVisibility}>{buttonLabel}</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>{cancelLabel || 'cancel'}</button>
      </span>
      <div style={showWhenVisible}>
        {children}
      </div>
    </span>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
