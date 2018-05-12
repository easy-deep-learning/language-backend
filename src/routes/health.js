const startDate = Date.now()

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/health',
    handler: (req, h) => {
      return `Uptime since ${Date(startDate)}`
    }
  })
}
