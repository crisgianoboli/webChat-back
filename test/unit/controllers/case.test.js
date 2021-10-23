'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const caseController = require('../../../src/controllers/caseController')
const sandbox = sinon.createSandbox()

let apiStub
test.beforeEach(t => {
  apiStub = sinon.stub()
})

test.afterEach(() => {
  sandbox.restore()
})

test('Methods should be executed once', t => {
  apiStub.async = sinon.stub().returns({
    UCUserName: 'user name',
    ClientName: 'client name',
    caseConversationId: 1233456,
    data: 'data field',
  })
  apiStub.getConversation = sinon.stub().returns({})
  const params = {
    req: {
      params: {
        caseId: 123456,
      },
    },
    res: 'response',
    next: 'next',
  }
  const response = caseController({
    controllerWrapper: apiStub,
    caseProvider: apiStub,
    clientProvider: apiStub,
    notivationProvider: apiStub,
    commentsProvider: apiStub,
  }).getConversation(params.req, params.res, params.next)
  expect(apiStub.async.calledOnce).to.be.true
})
