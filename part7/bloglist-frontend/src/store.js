import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/BlogReducer'
import notificationReducer from './reducers/NotificationReducer'
import loginReducer from './reducers/LoginReducer'
import usersReducer from './reducers/UsersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loginReducer,
  users: usersReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)