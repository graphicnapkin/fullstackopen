import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
  <div style={blogStyle}>{blog.title} {' '}
  <Togglable buttonLabel={'view'} cancelLabel={'hide'}>
      url: {blog.url} <br/>
      likes: {blog.likes} <button onClick={''}>like</button> <br/>
      author: {blog.author} <br/>
    </Togglable>
  </div>
)}

export default Blog
