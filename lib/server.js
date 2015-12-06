'use strict'

const _ = require('lodash')
const Hapi = require('hapi')
const Hoek = require('hoek')

module.exports = {

  createServer (config) {
    const server = new Hapi.Server()
    server.connection({
      host: config.host,
      port: config.port
    })

    return server
  },

  registerViews (app, server) {
    const viewEngine = app.config.views.engine

    server.register(require('vision'), function(err) {
      Hoek.assert(!err, err);
    })

    server.views({
      engines: {
        html: require(viewEngine)
      },
      relativeTo: __dirname + '../../../../',
      path: 'templates'
    })
  },

  registerMethods (app, server) {
    const routes = app.routes
    const controllers = app.api.controllers
    const policies = app.api.policies
    const handlers = _.unique(_.pluck(routes, 'handler'))
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
    _.each(app.config.routes, route => server.route(route))
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
