'use strict'

const _ = require('lodash')
const Path = require('path')
const Hapi = require('hapi')
const Hoek = require('hoek')

module.exports = {

  createServer (config) {
    const server = new Hapi.Server()
    let filePath = Hoek.applyToDefaults({www: { directory: config.main.paths.root } }, config.web, true)
    server.connection({
      host: config.web.host,
      port: config.web.port,
      routes: {
        files: {
          relativeTo: Path.resolve(__dirname, filePath.www.directory)
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
    if (!app.config.web.views.engines) {
      app.log.debug('config.views: No view engine is set. Not loading.')
      return
    }
    server.views(app.config.web.views)
  },

  registerMethods (app, server) {
    const routes = app.routes
    const controllers = app.controllers
    const policies = app.policies
    const handlers = _.filter(_.uniqBy(_.map(routes, 'handler')), _.isString)
    const prerequisites = _.uniqBy(_.map(_.flatten(_.map(routes, 'config.pre')), 'method'))

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
    if (app.config.web.www) {
      //If www is provided add it to the routes
      app.routes.push({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
              path: '.',
              index: app.config.web.www.index || false,
              listing: app.config.web.www.listing || false,
              showHidden: app.config.web.www.showHidden || false,
              redirectToSlash: app.config.web.www.redirectToSlash || false,
              lookupCompressed: app.config.web.www.lookupCompressed || false,
              etagMethod: app.config.web.www.etagMethod || 'hash'
          }
        }
      })
    }

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
