import blogService from '../services/blogs'

const reducer = (state = [], { type, data }) => {
  switch(type) {
  case 'NEW_BLOG':
    return state.concat(data)
  case 'INIT_BLOGS':
    return data
  case 'LIKE_BLOG':
    console.log(state)
    return state.map(blog => {
      console.log(data.id)
      if (blog.id === data.id) {
        return {
          ...blog,
          likes: blog.likes + 1
        }
      }
      return blog
    })
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(content.data, content.auth)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
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
  return async dispatch => {
    await blogService.likeBlog({ id, likes: likes + 1 }, userToken)
    console.log('made it into dispatch')
    dispatch({
      type: 'LIKE_BLOG',
      data: { id }
    })
  }
}

export const deleteBlogPost = async ({ id, title, author, userToken }) => {
  return async dispatch => {
    if(window.confirm(`Remove blog ${ title } by ${ author }?`)){
      blogService.deleteBlog({ id }, userToken)
      setTimeout(() => {
        dispatch(initBlogs())
      }, 100)
    }
  }
}

export default reducer