import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'this is a test title',
    url: 'http://thisisatest.url',
    likes: '92',
    id: '0293wfslakjfasfusaf',
    author: 'Jon Carter',
    user: { username: 'graphicanpkin' },
    currentUser: { username: 'graphicnapkin' }
  }
  const component = render(
    <Blog
      blog={blog}
      user={{ username: 'graphicanpkin' }}
      currentUser={{ username: 'graphicnapkin' }}
      likeBlogPost={() => {}}
      deleteBlogPost={() => {}}
    />
  )
  const button = component.container.querySelector('button')
  console.log(prettyDOM(button))
  expect(component.container).toHaveTextContent('this is a test title')
})
