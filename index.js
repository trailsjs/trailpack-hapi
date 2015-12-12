'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

/**
 * Hapi Trailpack
 *
 * @class Hapi
 * @see {@link http://trailsjs.io/doc/trailpack
 *
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class Hapi extends Trailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. express)
   */
  validate () {
    if (_.contains(_.keys(this.app.packs), 'express4', 'koa', 'koa2', 'restify')) {
      return Promise.reject(new Error('There is another web services trailpack installed that conflicts with trailpack-hapi!'))
    }

    return Promise.resolve()
  }

  /**
   * Start Hapi Server
   */
  initialize () {
    const server = lib.Server.createServer(this.app.config.web)

    lib.Server.registerMethods(this.app, server)
    lib.Server.registerRoutes(this.app, server)
    lib.Server.registerViews(this.app, server)

    return lib.Server.start(server)
  }

  constructor (app, config) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

}

