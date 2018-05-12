'use strict'

process.on('unhandledRejection', (err) => {
  console.warn(err)
  process.exit(1)
})

const Hapi = require('hapi')
const options = require('./options')

const server = Hapi.server(options.server)

const init = async () => {
  await server.register(require('./plugins'))

  require('./routes')(server)

  await server.start()

  console.log(`Server running at: ${server.info.uri}`)
}

try {
  init()
} catch (err) {
  console.error('Server start fails')
  console.warn(err)
  process.exit(1)
}
