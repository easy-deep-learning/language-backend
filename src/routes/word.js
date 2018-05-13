const Boom = require('boom')

module.exports = server => {
  const Word = require('../models/Word')(server)

  server.route({
    method: 'GET',
    path: '/words',
    handler: (req, h) => Word.find({})
  })

  server.route({
    method: 'POST',
    path: '/words',
    handler: async (req, h) => {
      const word = new Word(req.payload)
      try {
        return await word.save()
      } catch (err) {
        return Boom.boomify(err, {statusCode: 409})
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/words/{word}',
    handler: (req, h) => Word.find({word: req.params.word})
  })

  server.route({
    method: 'PATCH',
    path: '/words/{word}',
    handler: async (req, h) => {
      try {
        await Word.findOneAndUpdate(
          {
            word: req.params.word
          },
          {...req.payload, updated_at: Date.now()}
        )
        return Word.find({word: req.params.word})

      } catch (err) {
        return Boom.boomify(err, {statusCode: 409})
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/words/{word}',
    handler: (req, h) => Word.remove({word: req.params.word})
  })
}
