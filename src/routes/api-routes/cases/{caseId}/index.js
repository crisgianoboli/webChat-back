'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const caseController = require('../../../../controllers/caseController')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(caseController)
  const operations = {
    get: [jwtDecode, api('getConversation')],
  }

  operations.get.apiDoc = {
    description: 'Get Conversation by Case',
    operationId: 'getConversationByCase',
    tags: ['cases'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'caseId',
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
