import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './reducers/LoginReducer'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import LoggedIn from './components/LoggedIn'

const App = () => {
  const padding = {
    padding: 5
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (loggedUserJSON) dispatch(setUser(user))
  }, [dispatch])

  return (
    <Router>

      <div>
        <Link style={ padding } to='/'>Blogs</Link>
        <Link style={ padding } to='/users'>Users</Link>
        <LoggedIn />
      </div>
      <Notification />
      <Login />

      <Switch>

        <Route path='/blogs/:id'>
          <Blog />
        </Route>

        <Route path='/users/:id'>
          <User />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path ='/'>
          <BlogForm />
          <BlogList />
        </Route>

      </Switch>

    </Router>
  )
}

export default App