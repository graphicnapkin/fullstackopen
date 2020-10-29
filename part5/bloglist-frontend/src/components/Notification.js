import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    const className = message.type === 'error' ? 'error' : 'info'
    const color = message.type === 'error' ? 'red' : 'green'
    const style = {
      color,
      border: `3px solid ${color}`,
      margin: 10,
      textAlign: 'center',
      background: 'lightgray'
    }
    return <h3 className ={className} style={style}>{ message.text}</h3>
  }
  return <></>
}

export default Notification