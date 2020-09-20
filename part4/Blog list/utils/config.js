require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URL

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  PORT,
  MONGO_URI
}