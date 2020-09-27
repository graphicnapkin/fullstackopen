const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { usersInDb } = require('./tests_helper')
const api = supertest(app)


describe('when there is initially one user in db', () =>{
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User ({ username: 'root', name: 'admin', passwordHash})
    
    await user.save()
  })

  test('get all users returns a list of users', async () => {
    const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type',/application\/json/)
    
    expect(response.body).toBeDefined
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'graphicnapkin',
      name: 'Jonathan Carter',
      password: '1stTimeFor'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 2)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('invalid user returns error', async () => {
    const newUser1 = {
      username: 'graphicnapkin2',
      name: 'Jonathan Carter',
      password: '1s'
    }

    const newUser2 = {
      username: 'gr',
      name: 'Jonathan Carter',
      password: '1stTime'
    }

    await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await usersInDb()
    
    const newUser = {
      username: 'root',
      name: 'admin',
      password: 'sekret'
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
})

