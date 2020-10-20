import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <><h2>Log in to the Application</h2>
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
    </>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default Login