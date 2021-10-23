'use strict'

const { makeInvoker } = require('awilix-express')

const {
  jwtDecode,
} = require('../../../../../middlewares/validations/jwtDecode')
const caseController = require('../../../../../controllers/caseController')

module.exports = function () {
  const api = makeInvoker(caseController)

  const operations = {
    post: [jwtDecode, api('getManagmentCaseExitController')],
  }
  //FIXME se tendria q poder mandar sin profile y q no rompa
  operations.post.apiDoc = {
    description: 'get managment case exit',
    operationId: 'getManagmentCaseExit',
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
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              onPause: {
                type: 'boolean',
                nullable: true,
                example: null,
              },
              blockedGuid: {
                type: 'string',
                nullable: false,
                example: '131aa340-ce47-41c5-b9ec-c763f531cad8',
              },
            },
          },
        },
      },
    },
    //TODO complete de response
    // TODO queda pendiente modificar el controlador para que devuelva solo estas properties.
    responses: {
      200: {
        description: 'Success',
      },
    },
  }
  return operations
}
