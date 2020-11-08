import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlogPost, commentBlogPost, deleteBlogPost } from '../reducers/BlogReducer'

const Blog = () => {
  const [newComment, setNewComment] = useState('')
  const history = useHistory()
  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  let blog = useSelector(state => state.blogs)
    .find(blog => blog.id === id)

  if(!user) history.push('/')
  if(blog && !blog.comments) blog.comments = []

  const like = () => dispatch(likeBlogPost({
    id: blog.id,
    likes: blog.likes,
    userToken: user.token
  }))

  const comment = event => {
    event.preventDefault()
    dispatch(commentBlogPost({
      id: blog.id,
      comments: blog.comments.concat({ body: newComment, username: user.username }),
      userToken: user.token
    }))
    setNewComment('')
  }

  const deleteButton = () => <button id={ blog.id } value={ blog.id } onClick={ deletePost } >remove</button>

  const deletePost = () => {
    if(window.confirm(`Remove blog ${ blog.title } by ${ blog.author }?`)) {
      dispatch(deleteBlogPost({ id: blog.id, userToken: user.token }))
      history.goBack()
    }
  }

  if (!blog) return ''

  return (
    <div>
      <h1>{ blog.title }</h1>
      <p>
        url: { blog.url }<br />
        likes: { blog.likes || 0 } <button onClick={like}>like</button><br/>
        added by: { user.username }{' '}
        { blog.user && blog.user.username === user.username && deleteButton() }
      </p>
      <h3>comments</h3>
      <form onSubmit={comment}>
        <input
          type='text'
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type='submit' id='submit-button'>add comment</button>
      </form>
      {blog.comments.map(comment => <li key={comment.body + Date.now()}>{comment.body} from: {comment.username}</li>)}
    </div>
  )
}

export default Blog