import React from 'react'
import Blog from './Blog'

function BlogList({blogs, user}) {
  if(!user) return <></>
  return (
    <>
      <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

export default BlogList
