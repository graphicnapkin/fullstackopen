//https://fullstackopen.com/en/part4/testing_the_backend
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('there are are 17 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(26)
})

test('the first blog is about ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[16]._id).toBe('5f66b7c8da77fb23a8cb09d3')
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

test('blog without content is not added', async () => {
  const newBlog = {
    // title: "test Blog 18",
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type',/application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})