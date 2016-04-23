'use strict'

const _ = require('lodash')
const Hapi = require('hapi')
const path = require('path')

module.exports = {

  createServer (config) {
    const server = new Hapi.Server()
    const defaultOptions = {
      host: config.web.host,
      port: config.web.port,
      routes: {
        files: {
          relativeTo: config.main.paths.root
        }
      }
    }
    config.web.options || (config.web.options = { })
    server.connection(_.defaultsDeep(config.web.options, defaultOptions))

    return server
  },

  registerPlugins (app, server) {
    return new Promise((resolve, reject) => {
      server.register(app.config.web.plugins || [], err => {
        if (_.isFunction(app.config.web.onPluginsLoaded))
          app.config.web.onPluginsLoaded.call(app, err)

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

    if (app.config.main.paths.www) {
      const staticDir = path.relative(app.config.main.paths.root, app.config.main.paths.www)
      server.route({
        method: 'GET',
        path: path.join('/', staticDir, '{filename*}'),
        handler: {
          file: function(request) {
            return path.join(staticDir, request.params.filename)
          }
        }
      })
    }
    else {
      app.log.info('config.paths.www: No www directory is set, static files will not be loaded')
    }

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
