'use strict'

const _ = require('lodash')
const path = require('path')

module.exports = {

  registerPlugins (config, server, app) {
    app.log.debug('trailpack-hapi: registering', config.plugins.length, 'plugins')

    return server.register(config.plugins)
      .then(() => {
        if (_.isFunction(config.onPluginsLoaded)) {
          config.onPluginsLoaded.call(app)
        }
      })
      .catch(err => {
        app.log.error('Hapi Error:', err)
        throw err
      })
  },

  registerViews (config, server, app) {
    if (!config.views.engines.html && !config.views.engines.pug) { //for pug need not html key
      app.log.debug('config.views: No view engine is set. Not loading.')
      return
    }

    app.log.debug('trailpack-hapi: registering views')
    server.views(config.views)
  },

  registerRoutes (config, server, app) {
    server.route(app.routes)

    if (app.config.main.paths.www) {
      const staticDir = path.relative(app.config.main.paths.root, app.config.main.paths.www)
      server.route({
        method: 'GET',
        path: '/'.concat(staticDir.replace(/\\/g, '/'), '/{filename*}'),
        handler: {
          file: function(request) {
            return path.join(staticDir, request.params.filename)
          }
        }
      })
    }
    else {
      app.log.debug('config.paths.www: No www directory is set, static files will not be loaded')
    }
  },

  registerExtensions (config, server, app) {
    config.extensions.forEach(ext => {
      ext.method = ext.method.bind({ app: app })
      server.ext(ext)
    })
  }
}
