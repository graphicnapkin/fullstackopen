const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async ( _ , response) => {
  const users = await User.find({})
  .populate('blogs', { title:1, author: 1, url:1, likes:1})

  response.json(users)
})

usersRouter.post('/', async ({body:{password, username, name}}, response) => {
  if(password.length < 3) {
    return response
    .status(400)
    .json({error: 'Password must be at least 3 characters....'})
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
