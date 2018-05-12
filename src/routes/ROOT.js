module.exports = server => {
  const Request = require('../models/Request')(server)

  server.route({
    method: 'GET',
    path: '/',
    handler: async (req, h) => {
      await (new Request(req.headers)).save()
      return Request.find({})
    }
  })
}
