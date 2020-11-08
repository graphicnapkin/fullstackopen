import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (!message) return ''

  const variant = message.type === 'error' ? 'danger' : 'success'

  return (
    <div className='container' >
      <Alert variant={ variant }>
        { message.text }
      </Alert>
    </div>
  )
}

export default Notification