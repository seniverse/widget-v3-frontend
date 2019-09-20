const _ = require('lodash')
const common = require('./base')
const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`)

module.exports = _.merge(common, config, { env })
