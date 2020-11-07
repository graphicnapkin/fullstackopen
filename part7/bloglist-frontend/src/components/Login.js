import React, { useState, useEffect } from 'react'
import Togglable from '../components/Togglable'
import loginService from '../services/login'

import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/UserReducer'
import { postNotification } from '../reducers/NotificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (loggedUserJSON) dispatch(loginUser(user))
  }, [dispatch])

  const login = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(loginUser(user))
    } catch (exception) {
      dispatch(postNotification({ text:'Wrong credentials',type:'error' }))
    }
  }

  if(user !== null) return ('')

  return (
    <Togglable buttonLabel={ 'login'}>
      <h2>Log in to the Application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </Togglable>
  )
}

export default Login