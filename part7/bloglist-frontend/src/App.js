import React from 'react'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <Login />
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default App