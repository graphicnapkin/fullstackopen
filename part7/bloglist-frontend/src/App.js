import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
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
import NavigationBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (loggedUserJSON) dispatch(setUser(user))
  }, [dispatch])

  return (
    <div className='container'>
      <Router>

        <NavigationBar/>
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
    </div>
  )
}

export default App