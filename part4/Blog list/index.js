//https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing
const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`))