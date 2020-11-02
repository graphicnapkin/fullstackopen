import React from 'react'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Anecdote anecdote={anecdote}/> )}
    </ul>
  </div>
)

export default AnecdoteList
