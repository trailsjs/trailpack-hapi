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

  registerMethods (routes, api, server) {
    let handlers = _.unique(_.pluck(routes, 'handler'))
    let prerequisites = _.unique(_.pluck(_.flatten(_.pluck(routes, 'config.pre')), 'method'))

    // register route handlers
    server.method(_.map(handlers, handler => {
      return {
        name: handler,
        method: Hoek.reach(api.controllers, handler)
      }
    }))

    // register prerequisites
    server.method(_.map(prerequisites, prerequisite => {
      return {
        name: prerequisite,
        method: Hoek.reach(api.policies, prerequisite)
      }
    }))

  },

  registerRoutes (routes, server) {
    _.each(routes, route => server.route(route))
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
