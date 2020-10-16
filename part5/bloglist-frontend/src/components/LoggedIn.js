import React from 'react'

function LoggedIn({name,handleLogout}) {
  return (
    <div>
      <h1>blogs</h1>
      <p>{name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
    </div>
  )
}

export default LoggedIn
