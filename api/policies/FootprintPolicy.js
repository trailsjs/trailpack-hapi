const _ = require('lodash')
const boom = require('boom')

/**
 * Footprint Policy
 *
 * Validate footprint requests; namely, that the path parameters represent
 * actual and correct models anda actions. Semantic ORM input validation is
 * performed by the FootprintService.
 *
 * @see http://hapijs.com/api#request-object
 */
module.exports = {
  create (request, reply) {
    if (!_.isPlainObject(request.payload)) {
      return reply(boom.preconditionFailed(this.__('errors.footprints.payload')))
    }

    reply()
  },
  find (request, reply) {
    reply()
  },
  update (request, reply) {
    reply()
  },
  destroy (request, reply) {
    reply()
  },
  createAssociation (request, reply) {
    reply()
  },
  findAssociation (request, reply) {
    reply()
  },
  updateAssociation (request, reply) {
    reply()
  },
  destroyAssociation (request, reply) {
    reply()
  }
}
