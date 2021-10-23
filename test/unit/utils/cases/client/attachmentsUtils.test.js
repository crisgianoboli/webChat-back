'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const AttachmentsUtils = require('../../../../../src/utils/client/attachmentsUtils')
const { attachment } = require('../../../../fixtures/attachments')
const { Comments } = require('../../../../fixtures/comments')
const sandbox = sinon.createSandbox()

test.afterEach(() => {
  sandbox.restore()
})

test(`Each array's element should have this structure { CaseCommentId, CaseId, ConversationId, CaseCommentAttachmentList}`, t => {
  const response = AttachmentsUtils().customizeAttachmentsResponse({
    data: { Comments },
  })
  expect(response).to.be.an('array')
  expect(response).to.deep.include(attachment)
})
