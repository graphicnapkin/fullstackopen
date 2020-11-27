import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import Notification from './components/Notification'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const padding = {
    padding: 5
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  
  return (
    <Router>
      <div className='nav' style={padding}>
        <Link style={padding} to='/authors'>Authors</Link>
        <Link style={padding} to='/books'>Books</Link>
        <Link style={padding} to='/addbook'>Add Book</Link>
      </div>
      <Notification errorMessage={errorMessage} />
      <Switch>
        <Route path='/authors'>
          <Authors setError={notify}/>
        </Route>
        <Route path='/books'>
          <Books />
        </Route>
        <Route>
          <AddBook setError={notify}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
