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

  /**
   * @see FootprintService.create
   */
  create (request, reply) {
    const FootprintService = this.api.services.FootprintService

    this.log.debug('[FootprintController] (create) model =',
      request.params.model, 'payload =', request.payload)

    reply(FootprintService.create(request.params.model, request.payload))
  },

  /**
   * @see FootprintService.find
   */
  find (request, reply) {
    const FootprintService = this.api.services.FootprintService

    this.log.debug('[FootprintController] (find) model =',
      request.params.model, 'query =', request.query)

    if (request.params.id) {
      reply(FootprintService.find(request.params.model, request.params.id))
    }
    else {
      reply(FootprintService.find(request.params.model, request.query))
    }
  },

  /**
   * @see FootprintService.update
   */
  update (request, reply) {
    const FootprintService = this.api.services.FootprintService

    this.log.debug('[FootprintController] (update) model =',
    request.params.model, 'criteria =', request.query, request.params.id,
      'values = ', request.payload)

    if (request.params.id) {
      reply(FootprintService.update(request.params.model, request.params.id, request.payload))
    }
    else {
      reply(FootprintService.update(request.params.model, request.query, request.payload))
    }
  },

  /**
   * @see FootprintService.destroy
   */
  destroy (request, reply) {
    const FootprintService = this.api.services.FootprintService

    this.log.debug('[FootprintController] (destroy) model =',
      request.params.model, 'query =', request.query)

    if (request.params.id) {
      reply(FootprintService.destroy(request.params.model, request.params.id))
    }
    else {
      reply(FootprintService.destroy(request.params.model, request.query))
    }
  },

  /**
   * @see FootprintService.createAssociation
   */
  createAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const payload = request.payload

    this.log.debug('[FootprintController] (createAssociation)',
      parentModel, '->', childAttribute, 'payload =', payload)

    reply(FootprintService.createAssociation(parentModel, parentId, childAttribute, payload))
  },

  /**
   * @see FootprintService.findAssociation
   */
  findAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    this.log.debug('[FootprintController] (findAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      'criteria =', request.query)

    if (childId) {
      reply(FootprintService.findAssociation(
        parentModel, parentId, childAttribute, childId, { findOne: true }
      ))
    }
    else {
      reply(FootprintService.findAssociation(
        parentModel, parentId, childAttribute, request.query
      ))
    }
  },

  /**
   * @see FootprintService.updateAssociation
   */
  updateAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    console.log('[FootprintController] (updateAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      'criteria =', request.query)

    if (childId) {
      reply(FootprintService.updateAssociation(
        parentModel, parentId, childAttribute, childId, request.payload, { findOne: true }
      ))
    }
    else {
      reply(FootprintService.updateAssociation(
        parentModel, parentId, childAttribute, request.query, request.payload
      ))
    }
  },

  /**
   * @see FootprintService.destroyAssociation
   */
  destroyAssociation (request, reply) {
    const FootprintService = this.api.services.FootprintService

  }
}

