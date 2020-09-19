const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI //grab URL including password from env
//heroku not seeing my env variable
//connect to mongoDB
//console.log('connecting to', url)
mongoose.connect(url, mongooseConfig)
  // eslint-disable-next-line no-unused-vars
  .then(_ => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message))
console.log('connecting to MongoDB')

//define person Schema
const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength:3,
    required: true,
    unique: true
  },
  phoneNumber: {
    type:String,
    minlength:8,
    required:true,
    unique: true
  }
})

personSchema.plugin(uniqueValidator)

//remove ID object and replace it with a stringified version
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
