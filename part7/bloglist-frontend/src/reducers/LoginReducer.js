import loginService from '../services/login'
import { postNotification } from './NotificationReducer'
import { initBlogs } from './BlogReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      await dispatch(initBlogs())
      dispatch({
        type: 'LOGIN',
        data: user
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      console.log(exception)
      dispatch(postNotification({ text:'Wrong credentials',type:'error' }))
    }
  }
}

export const setUser = user => {
  return async dispatch => {
    await dispatch(initBlogs())
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return { type: 'LOGOUT' }
}

export default reducer