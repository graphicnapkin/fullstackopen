import React, { useState } from 'react'
import Togglable from '../components/Togglable'
import { Form, Button } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/LoginReducer'
import { postNotification } from '../reducers/NotificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = event => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    dispatch(postNotification({ type: 'success', text: `Welcome ${username}` }))
    setUsername('')
    setPassword('')
  }

  if(user !== null) return ('')

  return (
    <Togglable buttonLabel={ 'login'}>
      <h2 >Log in to the Application</h2>
      <Form onSubmit={ login }>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={ username }
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            value={ password }
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type='submit'>
          login
          </Button>
        </Form.Group>
      </Form>
    </Togglable>
  )
}

export default Login