'use strict'

const tagsController = require('../../../controllers/clientController')
const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(tagsController)
  const operations = {
    POST: [jwtDecode, api('clientAllRoutes')],
  }

  operations.POST.apiDoc = {
    description: 'Get All Client Data',
    operationId: 'getAllClientData',
    tags: ['client'],
    parameters: [
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
              accountId: {
                type: 'integer',
                description:
                  'ID de la unidad de negocio. Valor obtenido de: Case.AccountId.',
                example: 2,
              },
              clientId: {
                type: 'integer',
                description:
                  'ID de la unidad de negocio. Valor obtenido de: Case.AccountId.',
                nullable: true,
                example: 68,
              },
              userChannelId: {
                type: 'integer',
                description:
                  'ID de usuario del canal. Valor obtenido de: Case.UserChannelId.',
                example: 2805,
              },
              accountTypeId: {
                type: 'integer',
                description:
                  'Id de la empresa; Valor obtenido de Case.AccountTypeId.',
                example: 7,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                Result: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
  }
  return operations
}
