//https://fullstackopen.com/en/part4/testing_the_backend
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs: blogs} = require('./tests_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('there are are 4 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})

// test('the first blog is about ', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body[0]._id).toBe('5f66b629066ab6221effa1c4')
// })

test('get by ID', async () => {
  const response = await api.get('/api/blogs/5f66b629066ab6221effa1c4')
  expect(response.body.id).toBe('5f66b629066ab6221effa1c4')
})

test('blog has proper id property', async () => {
  const response = await api.get('/api/blogs/')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "test Blog 17",
    author: "J the mother fuckin C",
    url: "https://googlez.com",
    likes: 132136
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type',/application\/json/)
})

test('blog will default to 0 likes if no likes given', async () => {
  const newBlog1 = {
    title: "test Blog 17",
    author: "J the mother fuckin C",
    url: "https://googlez.com",
  }
  const newBlog2 = {
    title: "test Blog 18",
    author: "J the mother fuckin C",
    url: "https://googlez.com",
    likes: 99
  }

  const response = await api.post('/api/blogs').send(newBlog1)
  const response2 = await api.post('/api/blogs').send(newBlog2)
  expect(response.body.likes).toBe(0)
  expect(response2.body.likes).toBe(99)
})

test('blog without content is not added', async () => {
  const newBlog1 = {
    author: "J the mother fuckin C",
    url: "https://googlez.com",
    likes: 99
  }

  const newBlog2 = {
    title: "test Blog 18",
    url: "https://googlez.com",
    likes: 99
  }

  await api
  .post('/api/blogs')
  .send(newBlog1)
  .expect(400)
  .expect('Content-Type',/application\/json/)

  await api
  .post('/api/blogs')
  .send(newBlog2)
  .expect(400)
  .expect('Content-Type',/application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})