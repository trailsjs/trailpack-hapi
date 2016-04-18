const joi = require('joi')

module.exports = joi.object().keys({
  port: joi.number().integer().positive().required(),
  host: joi.string(),
  plugins: joi.array().optional(),
  views: joi.object().optional(),
  server: joi.string()
})

