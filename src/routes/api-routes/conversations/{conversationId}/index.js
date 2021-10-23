'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const caseController = require('../../../../controllers/caseController')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(caseController)
  const operations = {
    get: [jwtDecode, api('getConversationCommentsController')],
    put: [jwtDecode, api('sendCommentsController')],
  }

  operations.get.apiDoc = {
    description: 'Get conversation comments by ConversationId',
    operationId: 'getCommentsByConversationId',
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
        description: 'Id de la conversación',
      },
    ],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  operations.put.apiDoc = {
    description: 'Send comment to conversation',
    operationId: 'sendComment',
    tags: ['conversations'],
    parameters: [
      {
        in: 'path',
        name: 'conversationId',
        required: false,
        description: 'Id de la conversación',
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
