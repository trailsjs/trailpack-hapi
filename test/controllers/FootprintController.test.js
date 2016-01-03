'use strict'

const assert = require('assert')
const supertest = require('supertest')

describe('FootprintController', () => {
  let request
  before(() => {
    request = supertest('http://localhost:3000')
  })

  describe('#create', () => {
    it('should insert a record', done => {
      request
        .post('/user')
        .send({
          name: 'createtest1'
        })
        .expect(200)
        .end((err, res) => {
          const user = res.body

          console.log(user)

          assert(user)
          assert(user.id)
          assert.equal(user.name, 'createtest1')

          done()
        })
    })
  })
  describe('#find', () => {
    it('should find a single record', () => {

    })
    it('should find a set of records', () => {

    })
  })
  describe('#update', () => {
    it('should update a single record', () => {

    })
    it('should update a set of records', () => {

    })
  })
  describe('#destroy', () => {
    it('should destroy a set of records', () => {

    })
  })
  describe('#createAssociation', () => {
    it('should insert an associated record', () => {

    })
  })
  describe('#findAssociation', () => {
    it('should find an associated record', () => {

    })
  })
  describe('#updateAssociation', () => {
    it('should update an associated record', () => {

    })
  })
  describe('#destroyAssociation', () => {
    it('should delete an associated record', () => {

    })
  })
})

