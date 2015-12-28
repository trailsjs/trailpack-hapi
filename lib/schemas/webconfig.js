const joi = require('joi')

module.exports = joi.object().keys({
  port: joi.number().integer().positive().required(),
  host: joi.string()
})

