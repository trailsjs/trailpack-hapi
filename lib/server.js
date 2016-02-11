'use strict'

const _ = require('lodash')
const Hapi = require('hapi')

module.exports = {

  createServer (config) {
    const server = new Hapi.Server()
    server.connection({
      host: config.web.host,
      port: config.web.port,
      routes: {
        files: {
          relativeTo: config.main.paths.root
        }
      }
    })

    return server
  },

  registerPlugins (app, server) {
    return new Promise((resolve, reject) => {
      server.register(app.config.web.plugins || [ ], err => {
        if (err) return reject(err)

        resolve()
      })
    })
  },

  registerViews (app, server) {
    if (!app.config.web.views.engines.html) {
      app.log.debug('config.views: No view engine is set. Not loading.')
      return
    }

    server.views(app.config.web.views)
  },

  registerRoutes (app, server) {
    _.each(app.routes, route => server.route(route))
  },

  start (server) {
    return new Promise((resolve, reject) => {
      server.start(err => {
        if (err) return reject(err)

        resolve()
      })
    })
  }
}
