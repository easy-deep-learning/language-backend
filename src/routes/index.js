module.exports = server => {
  require('./health')(server)
  require('./ROOT')(server)
}
