const reducer = (state = '', { type, data }) => {
  switch(type.toUpperCase()) {
    case 'ALERT':
      return data 
    case 'ERROR':
      return `Error: ${data}`
    case 'CLEAR':
      return ''
    default: 
      return ''
  }
}

export const alert = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: message.type || 'alert',
      data: message.data || message
    })
    return setTimeout(() => {
      dispatch(clearAlert())
    }, duration * 1000);
  }
}

export const clearAlert = () => ({ type: 'CLEAR', data: ''})

export default reducer