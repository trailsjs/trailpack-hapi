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

    server.connection(_.defaultsDeep(config.web.options || {}, defaultOptions))

    return server
  },

  registerPlugins (app, server) {
    const promises = _.map(app.config.web.plugins || [], plugin => {
      return new Promise((resolve, reject) => {
        server.register(_.omit(plugin, ['onLoad']), err => {
          if (_.isFunction(plugin.onLoad))
            plugin.onLoad.call(server, err)

          if (err) return reject(err)

          resolve()
        })
      })
    })

    return Promise.all(promises)
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

    server.route({
      method: 'GET',
      path: '/' + app.config.web.assets + '/{filename*}',
      handler: {
        file: function(request) {
          return path.join(app.config.web.assets, request.params.filename)
        }
      }
    })

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
