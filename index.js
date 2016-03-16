'use strict'

const _ = require('lodash')
const WebServerTrailpack = require('trailpack-webserver')
const lib = require('./lib')

/**
 * Hapi Trailpack
 *
 * @class Hapi
 * @see {@link http://trailsjs.io/doc/trailpack
 *
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class Hapi extends WebServerTrailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. express)
   */
  validate () {
    if (_.includes(_.keys(this.app.packs), 'express4', 'koa', 'koa2', 'restify')) {
      return Promise.reject(new Error('There is another web services trailpack installed that conflicts with trailpack-hapi!'))
    }

    return Promise.all([
      lib.Validator.validateWebConfig(this.app.config.web)
    ])
  }

  configure () {
    this.app.config.web.server = 'hapi'
    this.app.config.web.views.relativeTo = this.app.config.main.paths.root
  }

  /**
   * Start Hapi Server
   */
  initialize () {
    this.server = lib.Server.createServer(this.app.config)

    return lib.Server.registerPlugins(this.app, this.server)
      .then(() => {
        lib.Server.registerRoutes(this.app, this.server)
        lib.Server.registerViews(this.app, this.server)
      })
      .then(() => {
        return lib.Server.start(this.server)
      })
      .then(() => {
        this.app.emit('webserver:http:ready', this.server.listener)
      })
  }

  unload () {
    this.server.stop()
  }

  constructor (app, config) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

