'use strict'

const { makeInvoker } = require('awilix-express')
const loginController = require('../../../../../controllers/login.controller')

module.exports = function () {
  const api = makeInvoker(loginController)

  const operations = {
    POST: [api('changePassword')],
  }

  operations.POST.apiDoc = {
    description: 'Set Nuevo Password',
    operationId: 'changePassword',
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
                description: 'Usuario',
              },
              newPassword: {
                type: 'string',
                example: 'Allus+123',
                description: 'Nueva Contraseña del usuario',
              },
              code: {
                type: 'string',
                example: 'ab45er7t',
                description: 'Codigo de verficacion',
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
