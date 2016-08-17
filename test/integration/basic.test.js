'use strict'

const assert = require('assert')
const supertest = require('supertest')

describe('Basic Tests', () => {
  let request
  before(() => {
    request = supertest('http://localhost:3000')
  })

  describe('headers', () => {
    it('should contain X-Powered-By header', done => {
      // 'x-powered-by': 'Node/6.2.0 Trails/1.0.3',
      request
        .get('/user')
        .expect(200)
        .end((err, res) => {
          console.log(res.headers)
          assert(/^Node.+Trails/.test(res.headers['x-powered-by']))
          done(err)
        })
    })
  })
})
