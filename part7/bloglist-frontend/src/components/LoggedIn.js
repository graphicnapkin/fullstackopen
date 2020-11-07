import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/UserReducer'

const LoggedIn = () => {
  const dispatch = useDispatch()
  const name = useSelector(state => state.user.name)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(loginUser(null))
  }
  return (
    <div>
      <h1>blogs</h1>
      <p>{name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
    </div>
  )
}

export default LoggedIn
