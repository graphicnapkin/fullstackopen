import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/BlogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const { user, blogs } = useSelector(state => state)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  if(!user) return ''

  return (
    <div>
      <h1>blogs</h1>
      <Table striped>
        <thead>
          <tr>
            <td><b>Title</b></td>
            <td><b>Author</b></td>
          </tr>
        </thead>
        <tbody>
          {
            blogs
              .sort((a,b) => b.likes - a.likes)
              .map(blog => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}{' '}</Link>
                  </td>
                  <td>
                    {blog.author}
                  </td>
                </tr>))
          }
        </tbody>
      </Table>
    </div>
  )
}


export default BlogList
