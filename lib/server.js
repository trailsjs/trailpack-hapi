'use strict'

const _ = require('lodash')
const Hapi = require('hapi')
const Hoek = require('hoek')
const Inert = require('inert')

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
    server.register(require('vision'), function(err) {
      Hoek.assert(!err, err);
    })

    server.register(Inert, function(err) {
      Hoek.assert(!err, err);
    })

    /**
      TODO
      _.each(app.config.web.plugins, plugin => {
        server.register(plugin ...)
      })
    */
  },

  registerViews (app, server) {
    const viewEngine = app.config.views.engine

    if (!viewEngine) {
      app.log.info('config.views: No view engine is set')
      return
    }

    server.views({
      engines: {
        html: viewEngine
      },
      relativeTo: process.cwd(),
      path: 'views'
    })
  },

  registerMethods (app, server) {
    const routes = app.routes
    const controllers = app.controllers
    const policies = app.policies
    const handlers = _.filter(_.unique(_.pluck(routes, 'handler')), _.isString)
    const prerequisites = _.unique(_.pluck(_.flatten(_.pluck(routes, 'config.pre')), 'method'))

    // register route handlers
    server.method(_.map(handlers, handler => {
      return {
        name: handler,
        method: Hoek.reach(controllers, handler)
      }
    }))

    // register prerequisites
    server.method(_.map(prerequisites, prerequisite => {
      return {
        name: prerequisite,
        method: Hoek.reach(policies, prerequisite)
      }
    }))

  },

  registerRoutes (app, server) {
    _.each(app.routes, route => {
      server.route(route)
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
