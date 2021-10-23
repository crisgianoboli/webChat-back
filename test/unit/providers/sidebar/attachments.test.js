'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const attachmentsProvider = require('../../../../src/providers/sidebar/attachmentsProvider')
const { attachment } = require('../../../fixtures/attachments')
const { conversationParams } = require('../../../fixtures/conversation')
const sandbox = sinon.createSandbox()

let apiStub
test.beforeEach(t => {
  apiStub = sinon.stub()
})

test.afterEach(() => {
  sandbox.restore()
})

test('Attachments provider should return a customized array of file', t => {
  apiStub.getAttachmentService = sinon.stub().returns([attachment])
  const response = attachmentsProvider({
    attachmentsApi: apiStub,
  }).obtainAttachments(conversationParams)
  expect(response).to.be.an('array')
  expect(response).to.have.lengthOf(1)
  expect(apiStub.getAttachmentService.calledOnce).to.be.true
})
