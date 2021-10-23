'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const controllerWrapper = require('../../../../src/controllers/utils/controllerWrapper')
const sandbox = sinon.createSandbox()

let apiStub
test.beforeEach(t => {
  apiStub = sinon.stub()
})

test.afterEach(() => {
  sandbox.restore()
})

const resMock = {
  status: sinon.stub().returnsThis(),
  send(response) {
    return response
  },
}

test('Should return a response', async t => {
  apiStub.provider = sinon.stub().returns('provider response')
  const response = await controllerWrapper().async(
    'providers arguments',
    apiStub.provider,
    resMock,
    err => err
  )
  expect(response).to.be.equal('provider response')
  expect(apiStub.provider.calledOnce).to.be.true
})

test('Throws error if provider is rejected', t => {
  // eslint-disable-next-line prefer-promise-reject-errors
  apiStub.provider = sinon.stub().returns(Promise.reject())
  controllerWrapper()
    .async(
      'providers arguments',
      apiStub.provider,
      res => res,
      err => err
    )
    .then(result => {
      expect(result).to.be.undefined
    })
    .catch(err => {
      expect(err).to.eql({ error: 'ERROR' })
    })
})
