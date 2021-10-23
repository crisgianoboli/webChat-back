'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const logoutController = require('../../../../controllers/logout.controller')

module.exports = function () {
  const api = makeInvoker(logoutController)

  const operations = {
    POST: [jwtDecode, api('logout')],
  }

  operations.POST.apiDoc = {
    description: 'Logout',
    operationId: 'logout',
    tags: ['auth'],
    parameters: [
      //FIXME en realidad no se debería necesitar el header, el problema está en que hay un solo middleware que siempre chequea éste header y el auth bearer header
      {
        in: 'header',
        name: 'profile',
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
                example: 'False',
                description:
                  'Bit que indica si se encuentra en una pausa bloqueante o no. Valor por defecto: false',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  return operations
}
