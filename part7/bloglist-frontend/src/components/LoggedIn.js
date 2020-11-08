import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/LoginReducer'

const LoggedIn = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  if (!user) return ''

  return (
    <>
      {user.name} logged in <button type="submit" onClick={handleLogout}>logout</button>
    </>
  )
}

export default LoggedIn
