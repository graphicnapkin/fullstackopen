const mongoose = require('mongoose')
const config = require('./utils/config')
const mongoUrl = "mongodb+srv://fullStackOpenUser:jugyC\@Rz2utTz6J@qHdFybUe@fullstackopencluster1.di2zw.gcp.mongodb.net/blog?retryWrites=true&w=majority"

mongoose.connect(config.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('success!')).catch(error => console.log(error))