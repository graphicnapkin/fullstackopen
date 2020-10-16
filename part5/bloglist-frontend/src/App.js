import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [alertMessage, setAlertMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (loggedUserJSON) setUser(user)
  }, [])

  const handleLogin = async ({username,password}) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      setAlertMessage({text:'Wrong credentials',type:'error'})
      clearAlert()
    }
  }

  const handleLogout = event => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlogPost = async ({title,author,url}) => {
    try {
      await blogService.postBlog(
        {
          title,
          author,
          url,
          userId: user.userId
        },
        user.token
      )

      blogService.getAll().then(blogs => setBlogs(blogs))

      setAlertMessage({text:`a new blog ${title} by ${author} added`, type:'alert'})
      clearAlert()

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )

    } catch (exception) {
      setAlertMessage({text:'Invalid BlogPost',type:'error'})
      clearAlert()
    }
  }

  const clearAlert = seconds => {
    setTimeout(() => {
      setAlertMessage(null)
    }, seconds ? seconds * 1000 : 5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel={'login'}>
      <Login handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <>
      <LoggedIn name={user.name} handleLogout={handleLogout}/>
      <Togglable buttonLabel={'new blog'}>
        <BlogForm
          createBlogPost={createBlogPost}
          user={user}
        />
      </Togglable>
      <p></p>
    </>
  )
  

  return (
    <div>
      <Notification message={alertMessage}/>
  
      {user === null && loginForm()}
      {user !== null && blogForm()}
      <BlogList blogs={blogs} user={user}/>
    </div>
  )
}

export default App