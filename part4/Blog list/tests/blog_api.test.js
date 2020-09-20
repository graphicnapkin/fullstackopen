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
  expect(response.body).toHaveLength(17)
})

test('the first blog is about ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[16]._id).toBe('5f66b7c8da77fb23a8cb09d3')
})

afterAll(() => {
  mongoose.connection.close()
})