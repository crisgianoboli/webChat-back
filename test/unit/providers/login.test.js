'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const LoginProvider = require('../../../src/providers/loginProvider')
const sandbox = sinon.createSandbox()

let apiStub
test.beforeEach(t => {
  apiStub = sinon.stub()
  apiStub.get = sinon.stub().returns('Api Instance')
})

test.afterEach(() => {
  sandbox.restore()
})

test('Login provider should return 3 tokens', async t => {
  apiStub.login = sinon.stub().returns({
    token: 'token',
    refresh_token: 'refresh_token',
    UserSession: 'user info',
  })
  const loginProvider = await LoginProvider({
    appInstanceApi: apiStub,
    loginApi: apiStub,
    config: {
      login: {
        profile_settings: { key: 'key', iat: '6h', algorithm: 'HS512' },
      },
    },
  }).login({
    username: 'user',
    password: 'pass',
    authType: 'OWN',
    domain: 'null',
  })

  expect(apiStub.login.calledOnce).to.be.true
  expect(apiStub.get.calledOnce).to.be.true
  expect(loginProvider).to.have.property('profile_token')
  expect(loginProvider).to.have.property('token')
  expect(loginProvider).to.have.property('refresh_token')
  expect(loginProvider.refresh_token).to.be.equal('refresh_token')
})

test.todo('Verification Code')

test.todo('Change Password')
