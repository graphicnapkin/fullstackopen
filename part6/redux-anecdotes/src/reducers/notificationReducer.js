const reducer = (state = '', { type, data }) => {
  switch(type.toUpperCase()) {
    case 'ALERT':
      return `You voted for "${data}"` 
    case 'ERROR':
      return `Error: ${data}`
    case 'CLEAR':
      return ''
    default: 
      return ''
  }
}

export const alert = message => {
  return {
    type: message.type || 'alert',
    data: message.data || message
  }
}

export const clearAlert = () => ({ type: 'CLEAR', data: ''})

export default reducer