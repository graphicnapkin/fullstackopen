import React from 'react'

const Anecdote = ({ anecdote }) => <li key={anecdote.id} >{anecdote.content}</li>

export default Anecdote