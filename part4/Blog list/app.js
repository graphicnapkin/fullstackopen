const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middlewares')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info(`connecting to ${config.MONGO_URI}`)
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> logger.info('connected....'))
.catch(error => logger.error(`failed to connect... ${error.message}`))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('build'))
app.use('/api/blogs',blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app