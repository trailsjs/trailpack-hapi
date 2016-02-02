'use strict'

const assert = require('assert')
const supertest = require('supertest')

describe('Lib.Server', () => {
	let request
	before(() => {
		request = supertest('http://localhost:3000')
	})

  describe('#addRoutes', () => {
    it('should create directory routes when www config is provided', () => {
      assert.equal(global.app.routes.length, 9)
    })
  })

  describe('#getStaticAssets', () => {
    it.skip('should get static file', done => {
      //    Results in Error: Debug: internal, implementation, error
      //    TypeError: Uncaught error: Cannot read property 'find' of undefined
      //    at FootprintService.find
      request
        .get('/trails_test.json')
        .expect(200, done);
    })
  })
})

