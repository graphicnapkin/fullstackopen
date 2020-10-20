import React, { useState } from 'react'
import PropTypes from 'prop-types'

function BlogForm({ createBlogPost }) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogPost = (event) => {
    event.preventDefault()
    createBlogPost({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
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
    </>
  )
}

BlogForm.propTypes = {
  createBlogPost: PropTypes.func.isRequired
}
export default BlogForm
