'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const attachmentsController = require('../../../../controllers/sidebar/attachmentsController')

module.exports = function () {
  const api = makeInvoker(attachmentsController)
  const operations = {
    get: [jwtDecode, api('getAttachments')],
  }
  operations.get.apiDoc = {
    description: 'Get Attachments By ConversationId',
    operationId: 'getAttachmentsByConversationId',
    tags: ['conversations'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'conversationId',
        required: false,
        description: 'Id de caso',
      },
    ],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  return operations
}
