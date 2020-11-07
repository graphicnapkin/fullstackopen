import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/BlogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const likeBlogPost = async ({ id, likes }) => {
    likes++
    await blogService.likeBlog({ id, likes },user.token)
    dispatch(initBlogs())
  }

  const deleteBlogPost = async ({ id, title, author }) => {
    if(window.confirm(`Remove blog ${ title } by ${ author }?`)){
      blogService.deleteBlog({ id },user.token)
      setTimeout(() => {
        dispatch(initBlogs())
      }, 100)
    }
  }

  return (
    <div>
      <Notification message={ notification }/>
      <Login />
      <BlogForm />
      <BlogList
        blogs={ blogs }
        user={ user }
        likeBlogPost={ likeBlogPost }
        deleteBlogPost={ deleteBlogPost }
      />
    </div>
  )
}

export default App