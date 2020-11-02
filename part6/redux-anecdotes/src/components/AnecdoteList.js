import React, { useState } from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { alert } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes, voteFor, alert}) => {
  const [alertId, setAlertId] = useState('')
  
  const vote = async id => {
    const  { content } = anecdotes.find(item => item.id === id)
    await voteFor(id)
    if(alertId) clearTimeout(alertId)
    setAlertId(await alert(`You voted for: "${content}"`, 5))
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

const mapStateToProps = state => {
  if (state.filter) return {
    anecdotes: state.anecdotes
    .filter(item => item.content.match(state.filter))
  }
  return {
    anecdotes: state.anecdotes
    .sort((a,b) => b.votes - a.votes)
  }
}

const mapDispatchToProps = {
  voteFor,
  alert
}

const connectedAnecdotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdotesList
