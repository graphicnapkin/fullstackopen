const logger = require('./logger')

const requestLogger = (request, _, next) => {
  if (process.env.NODE_ENV !== 'test') { 
    logger.info('Method', request.method)
    logger.info('Path:', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
  }
  next()
}

const unknownEndpoint = ( _, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  if(error.name === 'CastError') return response.status(400).send({ error: 'malformed id' })
  if(error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
