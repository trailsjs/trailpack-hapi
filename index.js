const Hapi = require('hapi')
const _ = require('lodash')
const ServerTrailpack = require('trailpack/server')
const lib = require('./lib')

/**
 * Hapi Trailpack
 *
 * @class Hapi
 * @see {@link http://trailsjs.io/doc/trailpack}
 *
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class HapiTrailpack extends ServerTrailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. express)
   */
  validate () {

    //return lib.Validator.validateWebConfig(this.app.config.web)
  }

  configure () {
    this.webConfig = {
      plugins: this.app.config.get('web.plugins'),
      extensions: this.app.config.get('web.extensions'),
      options: this.app.config.get('web.options'),
      server: 'hapi',
      views: Object.assign(
        { relativeTo: this.app.config.get('main.paths.root') },
        this.app.config.get('web.views')
      )
    }

    _.defaultsDeep(this.webConfig.options, {
      host: this.app.config.get('web.host'),
      port: this.app.config.get('web.port'),
      routes: {
        files: {
          relativeTo: this.webConfig.views.relativeTo
        }
      }
    })
  }

  /**
   * Start Hapi Server
   */
  initialize () {
    this.server = new Hapi.Server()
    this.server.connection(this.webConfig.options)

    return lib.Server.registerPlugins(this.webConfig, this.server, this.app)
      .then(() => {
        lib.Server.registerRoutes(this.webConfig, this.server, this.app)
        lib.Server.registerViews(this.webConfig, this.server, this.app)
        lib.Server.registerExtensions(this.webConfig, this.server, this.app)
        lib.Server.nativeServer = this.server
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

