const merge = require('lodash/merge')
const common = require('./base')
const env = process.env.UPLOAD_ENV || 'development'
const config = require(`./${env}`)

module.exports = merge(common, config, { env })
