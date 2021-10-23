'use strict'

const request = require('supertest')
const test = require('ava')
const { expect } = require('chai')

const app = require('../../src/app')

test.serial('/api-docs should return openapi definition', async t => {
  const response = await request(app).get('/api/api-docs')

  expect(response).to.be.an('object')
  expect(response.status).to.equal(200)
  expect(response.body).to.be.an('object')
  expect(response.body.info.version).to.equal('3.0.0')
})
