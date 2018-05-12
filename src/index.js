'use strict'

const Hapi = require('hapi')

const options = {
  server: {
    port: process.env.PORT || '3000',
    host: process.env.IP || 'localhost'
  },
  mongo: {
    promises: 'native',
    uri: `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017`,
    username: process.env.MONGO_INITDB_ROOT_USERNAME || '',
    password: process.env.MONGO_INITDB_ROOT_PASSWORD || '',
    db: process.env.MONGO_INITDB_DATABASE || 'language-backend'
  }
}

const server = Hapi.server(options.server)
const startDate = Date.now()

// Routes
server.route({
  method: 'GET',
  path: '/health',
  handler: (req, h) => {
    return `Uptime since ${Date(startDate)}`
  }
})

process.on('unhandledRejection', (err) => {
  console.warn(err)
  process.exit(1)
})

const init = async () => {
  // Plugins
  await server.register({
    plugin: require('hapi-mongoose'),
    options: options.mongo
  })

  const db = server.plugins['hapi-mongoose'].connection
  const mongoose = server.plugins['hapi-mongoose'].lib

  const Schema = mongoose.Schema
  const requestSchema = new Schema({
    'user-agent': String,
    'accept': String,
  })

  const Request = db.model('Request', requestSchema)

  server.route({
    method: 'GET',
    path: '/',
    handler: async (req, h) => {
      await (new Request(req.headers)).save()
      return Request.find({})
    }
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
