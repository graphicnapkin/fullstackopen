import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0) 
  const [votes, setVotes] = useState({highestVoteCount:0, anecdote:''})

  const handleClick = () => setSelected(Math.floor(Math.random()* anecdotes.length))
  const handleVote = () => {
    let currentVote = votes[selected] === undefined ? 1 : votes[selected] + 1
    if (currentVote > votes.highestVoteCount) {
      setVotes({
        ...votes,
        highestVoteCount:currentVote,
        anecdote:anecdotes[selected],
        [selected]: currentVote
      })
    } else setVotes({...votes,[selected]: currentVote})
  }
  return (
    <div>
      <Content header="Anecdote of the day" anecdote= {anecdotes[selected]} voteCount={votes[selected] || "0"} />
      <Buttons text={"vote"} handler={handleVote}/><Buttons text={"next anecdote"} handler={handleClick}/>
      <Content header="Highest Voted" anecdote= {votes.anecdote} voteCount={votes.highestVoteCount || "0"} />
    </div>
  )
}

const Content = ({ header, anecdote, voteCount }) => {
  if(!anecdote) return ''
  return(
    <>
      <h1>{header}</h1>
      <p>{anecdote}</p>
      <span>has {voteCount} votes</span>
      <br/>
    </>
  )
}
const Buttons = ({ text, handler }) => <button onClick={handler}>{text}</button>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)