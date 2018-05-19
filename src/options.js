module.exports = {
  server: {
    port: process.env.PORT || '3000',
    host: process.env.HOST || 'localhost',
    routes: { cors: true }
  },
  mongo: {
    promises: 'native',
    uri: `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017`,
    username: process.env.MONGO_INITDB_ROOT_USERNAME || '',
    password: process.env.MONGO_INITDB_ROOT_PASSWORD || '',
    db: process.env.MONGO_INITDB_DATABASE || 'language-backend'
  }
}
