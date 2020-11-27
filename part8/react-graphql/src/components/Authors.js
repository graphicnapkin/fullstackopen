import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ setError}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const authors = useQuery(ALL_AUTHORS)

  const style = {
    paddingRight: 20
  }

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      setError(error.networkError.result.errors[0].message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    editAuthor({
      variables: {
        name,
        born,
      }
    })
    setName('')
    setBorn(0)
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div className='container'>
      <h2 style={{ paddingTop: 20 }}>Authors</h2>
      <table>
          <thead>
            <tr>
              <td><b>Name</b></td>
              <td><b>Born</b></td>
              <td><b>Book Count</b></td>
            </tr>
          </thead>
          <tbody>
          {[...authors.data.allAuthors].sort((a,b) => b.born - a.born).map((a,i) => (
            <tr key={i}>
              <td style={style}>{a.name}</td>
              <td style={style}>{a.born}</td>
              <td style={style}>{a.bookCount}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Set Birth Year</h3>
        <form onSubmit={handleSubmit}>
          {/* name: <input type='text' value={name} onChange={(e) => setName(e.target.value)}/> */}
          name: 
          <select style={{ margin: 20}} onChange={(e) => setName(e.target.value)}>
            {authors.data.allAuthors.map(({ name:authorName }, i) => {
              if(i === 0) return <option defaultValue value={authorName} key={i}>{authorName}</option>
              return <option value={authorName} key={i}>{authorName}</option>
            })}
          </select> <br/>
          born: <input type='text' value={born} onChange={(e) => {
            if(!isNaN(+e.target.value)) {
              setBorn(+e.target.value)
            }
          }} />
          <button type='submit' >update author</button>
        </form>
    </div>
  )
}

export default Authors
