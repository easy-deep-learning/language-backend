'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
    port: '3000',
    host: 'localhost'
})

const init = async () => {
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

const startDate = Date.now()

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

init()
