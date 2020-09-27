const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const { requestLogger, unknownEndpoint, errorHandler, tokenExtractor } = require('./utils/middlewares')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

//Connect to our test DB
logger.info(`connecting to ${config.MONGO_URI}`)
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> logger.info('connected....'))
.catch(error => {
  console.log(JSON.stringify(error))
  logger.error(`failed to connect... ${error.message}`)
})

//Use our our middlewares and routers
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
app.use(express.static('build'))
app.use('/api/blogs',blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app