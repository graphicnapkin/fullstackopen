import React, { useState } from 'react'
import { 
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import db from './db.json'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(db)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification('')
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/new'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>
      <Notification message={notification} />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdotes={anecdotes}/>
        </Route>
        <Route path='/new'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}

export default App;
