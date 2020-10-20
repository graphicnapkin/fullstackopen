import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlogPost, deleteBlogPost, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  let { title, url, likes, id, author, user } = blog
  user = user || { username: 'graphicnapkin' }
  const deleteButton = () => (
    <>
      <button
        id={id}
        value={id}
        onClick={() => deleteBlogPost(blog)}
      >remove</button><br/>
    </>
  )

  const likeButton = () => (
    <>
      <button
        value={id}
        onClick={() => likeBlogPost({ id, likes })}
      >like</button>
    </>
  )

  return (
    <div style={blogStyle}> {title} {' '}
      <Togglable
        id={id}
        buttonLabel={ 'view' }
        cancelLabel={'hide'}
      >
          url: {url} <br/>
          likes: { `${ likes ||'0'} ` } { likeButton() } <br/>
          author: { author } <br/>
        { currentUser.username === user.username && deleteButton() }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogPost: PropTypes.func.isRequired,
  deleteBlogPost: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog
