module.exports = server => {
  const db = server.plugins['hapi-mongoose'].connection
  const mongoose = server.plugins['hapi-mongoose'].lib

  const Schema = mongoose.Schema
  const requestSchema = new Schema({
    'user-agent': String,
    'accept': String,
  })

  return db.model('Request', requestSchema)
}
