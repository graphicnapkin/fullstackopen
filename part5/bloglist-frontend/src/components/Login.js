import React, {useState} from 'react'

const Login = ({handleLogin}) => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const login = event => {
   event.preventDefault()
   handleLogin({username,password})
   setUsername('')
   setPassword('')
  }

  return (
    <><h2>Log in to the Application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login