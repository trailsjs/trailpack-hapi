/**
 * Footprint Controller
 *
 * Parse the path and query params and forward them to the FootprintService.
 * The FootprintService is provided by any ORM trailpack, e.g.
 * trailpack-waterline, trailpack-sequelize, etc.
 *
 * @see {@link http://hapijs.com/api#request-object}
 */
module.exports = {
  create (request, reply) {
    const FootprintService = this.api.services.FootprintService
    reply(FootprintService.create(request.params.model, request.payload))
  },
  find (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  update (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  destroy (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  createAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  findAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  updateAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService

  },
  destroyAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService

  }
}
