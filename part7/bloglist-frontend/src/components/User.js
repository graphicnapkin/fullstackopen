import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  let blogs = useSelector(state => state.blogs)
    .filter(blog => blog.user.id === id)

  if (blogs.length === 0) return ''
  return (
    <div>
      <h1>{blogs[0].author}&apos;s blogs</h1>
      <h2>Added blogs</h2>
      {
        blogs.map(blog => (
          <li key={blog.id} >
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))
      }
    </div>
  )
}

export default User