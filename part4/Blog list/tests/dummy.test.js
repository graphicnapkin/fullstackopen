const { restart } = require('nodemon')
const listHelper = require('../utils/list_helper')
const {initialBlogs: blogs} = require('./tests_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(5)
  })

  test('when list has more than one blog, returns correct result', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(23)
  })

  test('when list is empty, returns 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, returns the correct result', ()=> {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      likes: 5,
    })
  })

  test('when list has more than one blog, returns correct result', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
        title: 'Howl',
        author: 'Edsger W. Dijkstra',
        likes: 10,
    })
  })

  test('when list is empty, returns 0', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('most blogs', () => {
  test('when list has only one blog, returns the correct result', ()=> {
    const result = listHelper.mostBlogs([blogs[0]])
    expect(result).toEqual({
      author: 'Edsger',
      blogs: 1,
    })
  })

  test('when list has more than one blog, returns correct result', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2,
    })
  })

  test('when list is empty, returns 0', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})

describe('most likes', () => {
  test('when list has only one blog, returns the correct result', ()=> {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({
      author: 'Edsger',
      likes: 5,
    })
  })

  test('when list has more than one blog, returns correct result', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17,
    })
  })

  test('when list is empty, returns 0', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
})