import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

function BlogList({ blogs, user, likeBlogPost, deleteBlogPost }) {
  if(!user) return <></>
  return (
    <>
      {
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlogPost={likeBlogPost}
              deleteBlogPost={deleteBlogPost}
              currentUser={user}
            />
          ))
      }
    </>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  likeBlogPost: PropTypes.func.isRequired,
  deleteBlogPost: PropTypes.func.isRequired,
}
export default BlogList
