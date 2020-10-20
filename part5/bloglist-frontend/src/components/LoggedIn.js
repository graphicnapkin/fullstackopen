import React from 'react'
import PropTypes from 'prop-types'

function LoggedIn({ name, handleLogout }) {
  return (
    <div>
      <h1>blogs</h1>
      <p>{name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
    </div>
  )
}

LoggedIn.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}
export default LoggedIn
