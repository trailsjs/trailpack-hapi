const Hapi = require('hapi')
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
    this.app.config.set('web.server', 'hapi')
    this.app.config.set('web.routes.files.relativeTo', this.app.config.get('main.paths.root'))

    this.serverConfig = {
      host: this.app.config.get('web.host'),
      port: this.app.config.get('web.port'),
      routes: this.app.config.get('web.routes')
    }
  }

  /**
   * Start Hapi Server
   */
  async initialize () {
    this.server = new Hapi.Server(this.serverConfig)
    const { server, app } = this

    await lib.Server.registerPlugins(server, app)
    lib.Server.registerRoutes(this.app.config.web, server, app)
    lib.Server.registerViews(this.app.config.web, server, app)
    lib.Server.registerExtensions(this.app.config.web, server, app)
    await this.server.start()

    this.app.emit('webserver:http:ready', this.server.listener)
  }

  async unload () {
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

