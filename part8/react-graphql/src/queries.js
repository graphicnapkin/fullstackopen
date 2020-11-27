import { gql } from '@apollo/client'

export const FIND_BOOKS_BY_AUTHOR = gql`
query findBooksByAuthor($authorToSearch: String!){
  allBooks(author: $nameToSearch){
    title
    published
    author
    genres
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    genres
  }
}
`
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    author
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor (
    name: $name
    setBornTo: $born
  ) {
    name
    born
  }
}
`