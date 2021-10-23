'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const ObservationsUtils = require('../../../../../src/utils/client/observationsUtils')
const {
  listCaseFileAttachmentBE,
  fileAttachmented,
} = require('../../../../fixtures/attachments')
const {
  Observations,
  customizedObservation,
} = require('../../../../fixtures/observations')
const sandbox = sinon.createSandbox()

test.afterEach(() => {
  sandbox.restore()
})

function macroOne(t, input, expected) {
  const response = ObservationsUtils().customizeSearchObservationsResponse(
    input
  )
  expect(response).to.deep.include(expected)
  expect(response).to.be.an('array')
}

function macroTwo(t, input, expected) {
  const response = ObservationsUtils().customizeAttachmentInObservationsResponse(
    input
  )
  expect(response).to.deep.include(expected)
  expect(response).to.be.an('array')
}

macroOne.title = (providedTitle = '', input, expected) =>
  `${providedTitle} ${input} = ${expected}`.trim()

test(
  `Test attribute should be removed from the response`,
  macroOne,
  {
    data: {
      Observations,
    },
  },
  customizedObservation
)

macroTwo.title = (providedTitle = '', input, expected) =>
  `${providedTitle} ${input} = ${expected}`.trim()

test(
  `Customized list of attachment elements`,
  macroTwo,
  {
    listCaseFileAttachmentBE,
  },
  fileAttachmented
)
