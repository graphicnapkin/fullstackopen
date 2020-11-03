import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from './hooks/useField'

const CreateNew = (props) => {
  const history = useHistory()
  const { clear: clearContent, ...content } = useField('content')
  const { clear: clearAuthor, ...author } = useField('author')
  const { clear: clearInfo, ...info } = useField('info')
  const [reset, setReset] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(reset) {
      clearContent()
      clearAuthor()
      clearInfo()
      return
    }
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/') 
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} >
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} /> 
        </div>
        <button onClick={()=> setReset(false)} >create</button >
        <button onClick={()=> setReset(true)}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew