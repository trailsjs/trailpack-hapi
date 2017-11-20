module.exports = {
  extensions: [
    {
      type: 'onPreResponse',
      method (request, reply) {
        const trailsVersion = this.app['_trails'].version
        const nodeVersion = this.app.versions.node
        const poweredBy = `Node/${nodeVersion} Trails/${trailsVersion}`

        if (request.response.isBoom) {
          request.response.output.headers['X-Powered-By'] = poweredBy
        }
        else if (request.response.header) {
          request.response.header('X-Powered-By', poweredBy)
        }

        reply.continue()
      }
    }
  ]
}
