const path = require('path')

module.exports = {

  async registerPlugins (server, app) {
    if (!app.config.get('web.plugins')) return

    app.log.debug('trailpack-hapi: registering', app.config.get('web.plugins').length, 'plugins')

    const plugins = app.config.get('web.plugins');
    for (var i=0; i < plugins.length; i++) {
      const plugin = plugins[i];
      await server.register(plugin);
    }
    await server.register(require('inert'))

    if (typeof app.config.get('web.onPluginsLoaded') === 'function') {
      app.config.get('web.onPluginsLoaded').call(app)
    }
  },

  registerViews (server, app) {
    if (typeof server.views !== 'function') return
    if (!app.config.get('views.engines')) {
      app.log.warn('trailpack-hapi: web.views.engines is not set. vision plugin will not load')
      return
    }

    app.log.debug('trailpack-hapi: registering views')
    server.views(app.config.get('web.views'))
  },

  registerRoutes (config, server, app) {
    server.route(app.routes)

    if (app.config.main.paths.www) {
      if (Array.isArray(app.config.main.paths.www)) {
        app.config.main.paths.www.map(item =>{
          const staticDir = path.relative(app.config.main.paths.root, item.path)
          server.route({
            method: 'GET',
            path: item.humanUrl ?
              item.humanUrl.concat('/{filename*}') :
              '/'.concat(staticDir.replace(/\\/g, '/'), '/{filename*}'),
            handler: {
              file: function(request) {
                return path.join(staticDir, request.params.filename)
              }
            }
          })
        })
      }
      else {
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
    }
    else {
      app.log.debug('config.paths.www: No www directory is set, static files will not be loaded')
    }
  },

  registerExtensions (config, server, app) {
    config.extensions.forEach(ext => {
      ext.method = ext.method.bind({ app })
      server.ext(ext)
    })
  }
}
