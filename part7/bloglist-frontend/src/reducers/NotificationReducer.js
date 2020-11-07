const reducer = (state = '', { type, data }) => {
  switch(type) {
  case 'ALERT':
    return data
  default:
    return state
  }
}

export const postNotification = data => {
  return async dispatch => {
    dispatch({
      type: 'ALERT',
      data: data
    })
    setTimeout(() => {
      dispatch({
        type: 'ALERT',
        data: ''
      })
    }, 5000)


  }
}
export default reducer