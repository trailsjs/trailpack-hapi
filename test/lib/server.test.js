'use strict'

const assert = require('assert')
//const supertest = require('supertest')

describe('Lib.Server', () => {
	// let request
	// before(() => {
	// 	request = supertest('http://localhost:3000')
	// })

	it('should create directory routes when www config is provided', () => {
		assert.equal(global.app.routes.length, 9)
	})

//Debug: internal, implementation, error
//    TypeError: Uncaught error: Cannot read property 'find' of undefined
//    at FootprintService.find

  // describe('#get static', () => {
  //   it('should get static file', done => {
  //     request
  //       .get('/trailt_test.json')
  //       .expect(200, done);
  //   })
  // })
})

