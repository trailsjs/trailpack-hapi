module.exports = {
  plugins: [
    {
      register: require('vision'),
      options: { }
    },
    {
      register: require('inert'),
      options: { }
    }
  ],

  views: {
    engines: {
      // html: require('some-view-engine')
    },
    path: 'views'
  },

  extensions: [
    {
      type: 'onPreResponse',
      method (request, reply) {
        if (!request.response.header) return reply.continue()

        const trailsVersion = this.app['_trails'].version
        const nodeVersion = this.app.versions.node
        request.response.header('X-Powered-By', `Node/${nodeVersion} Trails/${trailsVersion}`)
        reply.continue()
      }
    }
  ]
}
