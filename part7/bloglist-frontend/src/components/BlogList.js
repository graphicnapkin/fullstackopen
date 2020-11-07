import React, { useEffect } from 'react'
import Blog from './Blog'

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
      {
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default BlogList
