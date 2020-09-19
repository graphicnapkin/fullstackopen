/* eslint-disable no-unused-vars */
require('dotenv').config()
const Person = require('./models/person') // setup Person class from mongoDB connector
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const { response } = require('express')
const app = express()

// use middlewares
app.use(express.static('build')) // host static files
app.use(cors()) // allow two origins to talk to each other (port 3000 & 3001)
app.use(express.json()) // allow express to parse the JSON body of a request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// morgan config to show req body in logs
morgan.token('body', ({ body }) => JSON.stringify(body)) //destructure body from request

// Setup our Routes
app.post('/api/persons',({ body:{ name,phoneNumber } },res,next) => {
  console.log('got into route')
  if(!(name && phoneNumber)) {
    return res.status(404).json({
      error: 'must provide both name and number... '+
      `you provided name:${name} number:${phoneNumber}` })
  }
  const person = new Person({ name,phoneNumber })
  person.save().then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))
})

app.get('/info', (req,res,next) => {
  const currentDate = new Date()
  Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people \n`+
  `${currentDate.toDateString()} ${currentDate.toTimeString()}`)
  }).catch(err => next(err))
})

app.get('/api/persons', (req,res,next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(err => next(err))
})

app.get('/api/persons/:id', ({ params:{ id } },res,next) => {
  Person.findById(id)
    .then(person => person ? res.json(person) : res.status(404).end())
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req,res,next) => {
  const phoneNumber = req.body.newNumber
  const id = req.params.id
  Person.findByIdAndUpdate(id,{ $set:{ phoneNumber } },{
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(updatedPerson => {
      console.log(updatedPerson)
      const { name,phoneNumber,_id } = updatedPerson
      res.json({ name,phoneNumber,id:_id.toString() })
    })
    .catch(err => {
      console.log(JSON.stringify(err))
      next(err)})
})

app.delete('/api/persons/:id', ({ params:{ id } },res,next) => {
  Person.findByIdAndRemove(id)
    .then( _ => res.status(204).end())
    .catch(err => next(err))
})

const unknownEndpoint = ( _ ,res) => {
  res.status(404).send({ error: 'unknown endpoint, double check the url entered' })
}
app.use(unknownEndpoint)

const errorHandler = (err, _ ,res,next) => {
  if(err.name === 'CastError') return res.status(400).send({ error: 'malformatted id' })
  if(err.name === 'ValidationError') return res.status(400).json({ error: err.message })
  next(err)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Listening on port: ${PORT}`)
})