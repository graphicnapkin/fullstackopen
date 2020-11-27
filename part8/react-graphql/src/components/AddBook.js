import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from '../queries'

const AddBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS} ],
    onError: (error) => {
      setError(error.networkError.result.errors[0].message)
    }
  })
  const history = useHistory()

  const addBook = event => {
    event.preventDefault()
    createBook({
      variables: {
        title,
        author,
        published,
        genres: [genres]
      }
    })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')

    console.log()
    history.push('/books')
  }

  return (
    <div className='container' style={{ paddingTop: 20 }}>
      <Form onSubmit={ addBook }>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>published:</Form.Label>
          <Form.Control 
            type='text'
            name='published'
            value={published}
            onChange={({ target }) => {
              if(!isNaN(+target.value)) setPublished(+target.value)
            }}
          />
          <Form.Label>genres:</Form.Label>
          <Form.Control 
            type='text'
            name='genres'
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
          <Button variant='primary' type='submit' style={{ marginTop: 15}}>
          add book
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddBook
