import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === id)
  
  if (anecdote) return (
    <>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </>
  )
  return ''
}

  

export default Anecdote