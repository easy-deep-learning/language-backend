'use strict'

const options = require('../options')

console.log("options.mongo: ", options.mongo); // eslint-disable-line

module.exports = {
  plugin: require('hapi-mongoose'),
  options: options.mongo
}
