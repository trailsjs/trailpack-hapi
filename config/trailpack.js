/**
 * Trailpack Configuration
 *
 * This manifest declares the application resources which are provided and/or
 * modified by this trailpack.
 */
module.exports = {
  provides: {
    config: {
      web: [ 'server' ]
    }
  },

  lifecycle: {
    initialize: {
      listen: [ 'trailpack:router:initialized' ],
      emit: [ 'webserver:http:ready' ]
    }
  }
}

