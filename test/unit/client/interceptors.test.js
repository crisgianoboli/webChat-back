'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const sandbox = sinon.createSandbox()

test.afterEach(() => {
  sandbox.restore()
})

test.todo(
  'Si el resultado de la llamada es http Ok y Result != null y Error != null - hay error'
)
test.todo('Si el resultado de la llamada es http != Ok Check Error ')

test.todo(
  'Si el resultado de la llamada es http Ok y Result != null - no hay errores'
)
