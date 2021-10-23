'use strict'

const { makeInvoker } = require('awilix-express')
const loginController = require('../../../../controllers/login.controller')

module.exports = function () {
  const api = makeInvoker(loginController)

  const operations = {
    POST: [api('login')],
  }

  operations.POST.apiDoc = {
    description: 'Login',
    operationId: 'login',
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
                description: 'Nombre de usuario a loguear',
              },
              password: {
                type: 'string',
                example: 'Allus+123',
                description: 'Contraseña del usuario',
              },
              authType: {
                type: 'string',
                example: 'OWN',
                description: 'Tipo de autenticación',
              },
              domain: {
                type: 'string',
                example: 'Allus-AR',
                description: 'Dominio del login',
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
