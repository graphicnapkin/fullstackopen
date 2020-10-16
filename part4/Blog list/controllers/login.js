const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require ('../models/user')

loginRouter.post('/', async ({body:{username, password}}, response) => {
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt
  .compare(password, user.passwordHash)

  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = jwt.sign({username, id: user._id}, process.env.SECRET )

  response
  .status(200)
  .send({ token, username, name: user.name, userId: user._id })
})

module.exports = loginRouter