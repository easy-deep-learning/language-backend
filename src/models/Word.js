module.exports = server => {
  const db = server.plugins['hapi-mongoose'].connection
  const mongoose = server.plugins['hapi-mongoose'].lib

  const Schema = mongoose.Schema
  const WordSchema = new Schema({
    word: {
      type: String,
      index: true,
      unique: true,
      lowercase: true
    },
    translations: {
      lang: String,
      main: String,
      example: String,
      variants: [{
        variant: String,
        example: String

      }]
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  })

  return db.model('Word', WordSchema)
}
