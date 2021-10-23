'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const sandbox = sinon.createSandbox()

test.afterEach(() => {
  sandbox.restore()
})

test.todo('addRequestData')

test.todo('logResponse')

test.todo('customizeLoginResponse')

test.todo('customizeResponse')

test.todo('handleError')
