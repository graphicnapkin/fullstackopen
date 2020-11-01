import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const vote = id => dispatch(voteFor(id))

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(({ id, content, votes }) =>
      <Anecdote 
        id={id}
        content={content}
        votes={votes}
        vote={vote}
        key={id}
      />
    )}
    </div>
  )
}

const Anecdote = ({ id, content, votes, vote }) => {
  return (
    <div >
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
