import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { alert, clearAlert } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  let { anecdotes, filter } = useSelector(state => state)

  if(filter) anecdotes = anecdotes.filter(item => item.content.match(filter))
  anecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

  const vote = id => {
    const  { content } = anecdotes.find(item => item.id === id)
    dispatch(voteFor(id))
    dispatch(alert(content))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(({ id, content, votes }) =>
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
