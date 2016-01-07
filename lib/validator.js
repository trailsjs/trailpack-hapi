const joi = require('joi')

const schemas = require('./schemas')

module.exports = {
  validateWebConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.webConfig, (err, value) => {
        if (err) return reject(new TypeError('config.web: ' + err))

        return resolve(value)
      })
    })
  }
}

