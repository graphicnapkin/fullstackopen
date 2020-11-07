
const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = data => {
  return {
    type: 'SET_USER',
    data
  }
}

export default reducer