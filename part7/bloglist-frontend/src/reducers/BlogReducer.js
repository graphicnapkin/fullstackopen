import blogService from '../services/blogs'
import { postNotification } from './NotificationReducer'

const reducer = (state = [], { type, data }) => {
  switch(type) {
  case 'INIT_BLOGS':
    return data
  case 'NEW_BLOG':
    return state.concat(data)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== data.id)
  case 'LIKE_BLOG':
    return state.map(blog => {
      if (blog.id === data.id) {
        return {
          ...blog,
          likes: blog.likes + 1
        }
      }
      return blog
    })
  case 'COMMENT_BLOG':
    return state.map(blog => {
      if(blog.id !== data.id) return blog
      return { ...blog, comments: data.comments }
    })
  default:
    return state
  }
}

export const createBlog = ({ title, author, url, userId, auth }) => {
  return async dispatch => {
    try {
      // eslint-disable-next-line no-unused-vars
      await blogService.postBlog({ title, author, url, userId } , auth)
      dispatch(postNotification({ text:`a new blog ${ title } by ${ author } added`, type:'alert' }))
      dispatch(initBlogs())
    } catch (error) {
      dispatch(postNotification({ text:`Invalid BlogPost ${error}`,type:'error' }))
    }
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlogPost = ({ id, likes, userToken }) => {
  return dispatch => {
    blogService.likeBlog({ id, likes: likes + 1 }, userToken)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id }
    })
  }
}

export const commentBlogPost = ({ id, comments, userToken }) => {
  return dispatch => {
    blogService.commentBlog({ id, comments }, userToken)
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id, comments }
    })
  }
}

export const deleteBlogPost = ({ id, userToken }) => {
  return dispatch => {
    blogService.deleteBlog({ id }, userToken)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default reducer