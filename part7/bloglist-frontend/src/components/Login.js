import React, { useState } from 'react'
import Togglable from '../components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/LoginReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = event => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const style = {
    //padding: 10,
    margin: 10
  }

  if(user !== null) return ('')

  return (
    <div style={ style }>
      <Togglable buttonLabel={ 'login'}>
        <h2 >Log in to the Application</h2>
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
          <button style ={ style } type='submit' id='login-button'>
            login
          </button>
        </form>
      </Togglable>
    </div>
  )
}

export default Login