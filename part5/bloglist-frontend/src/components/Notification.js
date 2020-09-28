import React from 'react'

const Notification = ({ message }) => {
  if (message) return <h1>{ message }</h1>
  return <></>
}

export default Notification