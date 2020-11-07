import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (!message) return ''

  const className = message.type === 'error' ? 'error' : 'info'
  const color = message.type === 'error' ? 'red' : 'green'
  const style = {
    color,
    border: `3px solid ${ color }`,
    margin: 10,
    textAlign: 'center',
    background: 'lightgray'
  }
  return <h3 className ={ className } style={ style }>{ message.text }</h3>
}

export default Notification