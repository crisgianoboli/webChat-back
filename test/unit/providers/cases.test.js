'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const CasesProvider = require('../../../src/providers/casesProvider')
const sandbox = sinon.createSandbox()

let serviceStub
test.beforeEach(t => {
  serviceStub = sinon.stub()
})

test.afterEach(() => {
  sandbox.restore()
})

function casesByMediaMacro(t, stubKey, filter) {
  serviceStub[stubKey] = sinon.stub().returns([{ CaseId: 11 }])

  const casesBySocialMedia = CasesProvider({
    casesServices: serviceStub,
  }).obtainCasesByStateOrSocialMedia({ filter })

  expect(casesBySocialMedia).to.be.an('array')
  expect(casesBySocialMedia).to.have.lengthOf(1)
  expect(casesBySocialMedia[0]).to.have.property('CaseId').equal(11)
  expect(serviceStub[stubKey].calledOnce).to.be.true
}

test(
  'Cases provider should return opened cases when filter is opened',
  casesByMediaMacro,
  'openedCases',
  'opened'
)

test.todo(
  'Cases provider should throw error when filter is not opened or closed and does not match with a defined social media'
)

test(
  "Cases provider should return closed cases when filter is 'closed'",
  casesByMediaMacro,
  'closedCases',
  'closed'
)

test(
  "Cases provider should return social media cases when filter is not 'opened' or 'closed' and is a defined social media",
  casesByMediaMacro,
  'casesBySocialMedia',
  'media'
)

test.todo('Grouped Cases Provider should return Grouped Cases ')
test.todo(
  "Grouped Cases Provider should send event 'Logged in with cases to manage' When has opened cases "
)
test.todo(
  "Grouped Cases Provider should send event 'Logged in without cases' When doesn't has opened cases "
)
