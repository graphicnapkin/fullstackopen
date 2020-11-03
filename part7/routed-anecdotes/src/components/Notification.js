import React from 'react'

const Notification = ({ message, time }) => {
  if(!message){
    return ''
  }
  return (
    <span>a new anecdote {message} created!</span>
  )
}

export default Notification