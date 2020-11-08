import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/BlogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const { user, blogs } = useSelector(state => state)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  if(!user) return ''

  return (
    <div>
      <h1>blogs</h1>
      {
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}{' '}</Link>
            </div>))
      }
    </div>
  )
}


export default BlogList
