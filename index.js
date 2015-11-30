'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

/**
 * Hapi Trailpack
 * 
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class Hapi extends Trailpack {

  constructor (app, config) {
    super(app, require('./config'), require('./api'))
  }

  /**
   * Ensure that config/server is valid, and that no other competing web
   * server trailpacks are installed (e.g. express)
   */
  validate () {
    if (this.config.server.engine != 'hapi') {
      return Promise.reject('To load trailpack-hapi, the server engine must be set to "hapi"')
    }
    if (_.contains(_.keys(this.app.packs), 'express4', 'koa', 'koa2', 'restify')) {
      return Promise.reject('There is another web services trailpack installed that conflicts with trailpack-hapi!')
    }

    return Promise.resolve()
  }

  /**
   * Start Hapi Server
   */
  initialize () {
    const server = lib.Server.createServer(this.config.server)

    lib.Server.registerMethods(this.app.routes, this.app.api, server)
    lib.Server.registerRoutes(this.app.routes, server)

    return lib.Server.start(server)
  }
}
