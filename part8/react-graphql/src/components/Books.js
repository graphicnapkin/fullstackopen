import React from 'react'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading ) {
    return <div>loading...</div>
  }

  const style = {
    paddingRight: 20
  }


  return (
    <div className='container'>
      <h2 style={{ paddingTop: 20 }}>Books</h2>
      <table>
        <thead>
          <tr>
            <td style={style}><b>title</b></td>
            <td style={style}><b>published</b></td>
            <td style={style}><b>author</b></td>
            <td style={style}><b>genres</b></td>
          </tr>
        </thead>
        <tbody>
          {[...books.data.allBooks].sort((a,b)=> b.published - a.published).map((b,i) => (
            <tr key={i}>
              <td style={style}>{b.title}</td>
              <td style={style}>{b.published}</td>
              <td style={style}>{b.author}</td>
              <td style={style}>{b.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
