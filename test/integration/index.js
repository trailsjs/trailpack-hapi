'use strict'

const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('./app'))
  return global.app.start()
    .then(() => {
      process.removeAllListeners('uncaughtException')
    })
    .catch(global.app.stop)
})

after(() => {
  return global.app.stop()
})

