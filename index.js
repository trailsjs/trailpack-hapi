'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

/**
 * Hapi Trailpack
 * 
 * Bind application routes to Hapi.js (from trailpack-router)
 */
module.exports = class Hapi extends Trailpack {

  constructor (app, config) {
    super(app, require('./config'), require('./api'))
  }

  initialize () {

  }

}
