import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleBlogPost = async event => {
    event.preventDefault()
    setErrorMessage(JSON.stringify(event))
    try {
      const blog = await blogService.postBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        userID: user.userId
      })
      setNewBlog(blog)
    } catch (exception) {
      setErrorMessage('Invalid BlogPost')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }

  }

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleLogin={handleLogin}
      setPassword={setPassword}
      setUsername={setUsername}
    />
  )

  const blogForm = () => (
    <BlogForm
      post={handleBlogPost}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
    />
  )
  

  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null && loginForm()}
      {user !== null && blogForm()}
      <BlogList blogs={blogs} user={user}/>
    </div>
  )
}

export default App