import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    const color = message.type === 'error' ? 'red' : 'green'
    const style = {
      color,
      border: `3px solid ${color}`,
      margin: 10,
      textAlign: 'center',
      background: 'lightgray'
    }
    return <h3 style={style}>{ message.text}</h3>
  }
  return <></>
}

export default Notification