'use strict'

const _ = require('lodash')
const Boom = require('boom')
const Controller = require('trails-controller')

/**
 * Footprint Controller
 *
 * Parse the path and query params and forward them to the FootprintService.
 * The FootprintService is provided by any ORM trailpack, e.g.
 * trailpack-waterline, trailpack-sequelize, etc.
 *
 * @see {@link http://hapijs.com/api#request-object}
 */
module.exports = class FootprintController extends Controller {

  /**
   * @see FootprintService.create
   */
  create (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)

    this.log.debug('[FootprintController] (create) model =',
      request.params.model, ', payload =', request.payload,
      'options =', options)

    reply(FootprintService.create(request.params.model, request.payload, options))
  }

  /**
   * @see FootprintService.find
   */
  find (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)
    let response

    this.log.debug('[FootprintController] (find) model =',
      request.params.model, ', criteria =', request.query, request.params.id,
      'options =', options)

    if (request.params.id) {
      response = FootprintService.find(request.params.model, request.params.id, options)
    }
    else {
      response = FootprintService.find(request.params.model, criteria, options)
    }

    reply(response
      .then(result => {
        if (!result) return Boom.notFound()

        return result
      }))
  }

  /**
   * @see FootprintService.update
   */
  update (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)

    this.log.debug('[FootprintController] (update) model =',
    request.params.model, ', criteria =', request.query, request.params.id,
      ', values = ', request.payload)

    if (request.params.id) {
      reply(FootprintService.update(request.params.model, request.params.id, request.payload, options))
    }
    else {
      reply(FootprintService.update(request.params.model, criteria, request.payload, options))
    }
  }

  /**
   * @see FootprintService.destroy
   */
  destroy (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)

    this.log.debug('[FootprintController] (destroy) model =',
      request.params.model, ', query =', request.query)

    if (request.params.id) {
      reply(FootprintService.destroy(request.params.model, request.params.id, options))
    }
    else {
      reply(FootprintService.destroy(request.params.model, criteria, options))
    }
  }

  /**
   * @see FootprintService.createAssociation
   */
  createAssociation (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const payload = request.payload

    this.log.debug('[FootprintController] (createAssociation)',
      parentModel, '->', childAttribute, ', payload =', payload,
      'options =', options)

    reply(FootprintService.createAssociation(parentModel, parentId, childAttribute, payload, options))
  }

  /**
   * @see FootprintService.findAssociation
   */
  findAssociation (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    this.log.debug('[FootprintController] (findAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      reply(FootprintService.findAssociation(
        parentModel, parentId, childAttribute, childId, _.extend({ findOne: true }, options)
      ))
    }
    else {
      reply(FootprintService.findAssociation(
        parentModel, parentId, childAttribute, criteria, options
      ))
    }
  }

  /**
   * @see FootprintService.updateAssociation
   */
  updateAssociation (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    this.log.debug('[FootprintController] (updateAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      reply(FootprintService.updateAssociation(
        parentModel, parentId, childAttribute, childId,
        request.payload, _.extend({ findOne: true }, options)
      ))
    }
    else {
      reply(FootprintService.updateAssociation(
        parentModel, parentId, childAttribute, criteria, request.payload
      ))
    }
  }

  /**
   * @see FootprintService.destroyAssociation
   * @return the id of the destroyed record
   */
  destroyAssociation (request, reply) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId
    let response

    this.log.debug('[FootprintController] (destroyAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      response = FootprintService.destroyAssociation(
        parentModel, parentId, childAttribute, childId, options)
    }
    else {
      response = FootprintService.destroyAssociation(
        parentModel, parentId, childAttribute, criteria, options)
    }

    reply(response
      .then(result => {
        if (!result) return Boom.notFound()

        return result
      })
    )
  }
}

