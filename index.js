'use strict'

const Hapi = require('hapi')
const _ = require('lodash')
const WebServerTrailpack = require('trailpack-webserver')
const lib = require('./lib')

/**
 * Hapi Trailpack
 *
 * @class Hapi
 * @see {@link http://trailsjs.io/doc/trailpack}
 *
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class HapiTrailpack extends WebServerTrailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. express)
   */
  validate () {

    //return lib.Validator.validateWebConfig(this.app.config.web)
  }

  configure () {
    const webConfig = this.app.config.web

    webConfig.plugins || (webConfig.plugins = [ ])
    webConfig.extensions || (webConfig.extensions = [ ])
    webConfig.options || (webConfig.options = { })

    webConfig.server = 'hapi'
    webConfig.views.relativeTo = this.app.config.main.paths.root

    _.defaultsDeep(webConfig.options, {
      host: webConfig.host,
      port: webConfig.port,
      routes: {
        files: {
          relativeTo: webConfig.views.relativeTo
        }
      }
    })
  }

  /**
   * Start Hapi Server
   */
  initialize () {
    this.webConfig = _.cloneDeep(this.app.config.web)

    this.server = new Hapi.Server()
    this.server.connection(this.webConfig.options)

    return lib.Server.registerPlugins(this.webConfig, this.server, this.app)
      .then(() => {
        lib.Server.registerRoutes(this.webConfig, this.server, this.app)
        lib.Server.registerViews(this.webConfig, this.server, this.app)
        lib.Server.registerExtensions(this.webConfig, this.server, this.app)
        lib.Server.nativeServer = this.server;
        return this.server.start()
      })
      .then(() => {
        this.app.emit('webserver:http:ready', lib.Server.nativeServer.listener)
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

