import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { likeBlogPost, deleteBlogPost } from '../reducers/BlogReducer'

const Blog = ({ blog }) => {
  let { title, url, likes, id, author, user } = blog
  const { token: userToken, username } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  user = user || { username: 'graphicnapkin' }

  const deleteButton = () => (
    <>
      <button id={ id } value={ id } onClick={ deletePost } >remove</button><br/>
    </>
  )

  const like = async () => await dispatch(likeBlogPost({ id, likes, userToken }))
  const deletePost = async () => await dispatch(deleteBlogPost(id, title, author, userToken))
  console.log(username, user.username)

  return (
    <div style={blogStyle}> {title} {' '}
      <Togglable id={ id } buttonLabel={'view'} cancelLabel={'hide'} >
        url: { url } <br/>
        likes: { `${ likes ||'0'} ` }
        <button value={ id } onClick={ like }>like</button> <br/>
        author: { author } <br/>
        { username === user.username && deleteButton() }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
