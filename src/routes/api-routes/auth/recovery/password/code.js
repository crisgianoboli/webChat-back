'use strict'

const { makeInvoker } = require('awilix-express')
const loginController = require('../../../../../controllers/login.controller')

module.exports = function () {
  const api = makeInvoker(loginController)

  const operations = {
    POST: [api('getVerificationCode')],
  }

  operations.POST.apiDoc = {
    description: 'Get Verification Code',
    operationId: 'getVerificationCode',
    tags: ['auth'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'esolution',
                description: 'Nombre de usuario',
              },
              email: {
                type: 'string',
                example: 'epiron_konecta@esolutions.com.ar',
                description: 'email del usuario',
              },
            },
          },
        },
      },
    },
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  return operations
}
