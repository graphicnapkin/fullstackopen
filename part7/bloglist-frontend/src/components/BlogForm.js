import React, { useState } from 'react'
import Togglable from '../components/Togglable'
import LoggedIn from '../components/LoggedIn'

import { useDispatch, useSelector } from 'react-redux'
import  { createBlog } from '../reducers/BlogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogPost = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title,
      author,
      url,
      userId: user.userId,
      auth: user.token
    }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if(user === null) return ''
  return (
    <>
      <LoggedIn />
      <Togglable buttonLabel={ 'new blog' }>
        <form onSubmit={addBlogPost}>
          <h2>new blog</h2>
          <div>
            {'title:    '}
            <input
              id='title'
              type='text'
              name='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            {'author: '}
            <input
              id='author'
              type='text'
              name='Author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            {'url: '}
            <input
              id='url'
              type='text'
              name='Url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit' id='submit-button'>create</button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
