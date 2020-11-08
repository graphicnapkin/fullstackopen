import usersService from '../services/users'
import { postNotification } from './NotificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getAllUsers()
      console.log(users)
      dispatch({
        type: 'GET_USERS',
        data: users
      })
    } catch (exception) {
      dispatch(postNotification({ text: exception,type:'error' }))
    }
  }
}

export default reducer