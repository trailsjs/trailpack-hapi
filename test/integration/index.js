const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('./app'))
  return global.app.start()
})

after(() => {
  return global.app.stop()
})

