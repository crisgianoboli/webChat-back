'use strict'
const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const casesController = require('../../../controllers/casesController')

module.exports = function () {
  const api = makeInvoker(casesController)
  const operations = {
    get: [jwtDecode, api('getGroupedCases')],
  }

  operations.get.apiDoc = {
    description: 'Get cases grouped by social media',
    operationId: 'getGroupedCases',
    tags: ['cases'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                opened: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de casos abiertos',
                },
                Mail: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de la red social Mail',
                },
                Facebook: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de la red social Facebook',
                },
                Twitter: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de la red social Twitter',
                },
                Instagram: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de la red social Instagram',
                },
                hidden: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de casos ocultos',
                },
                closed: {
                  type: 'integer',
                  format: 'int32',
                  description: 'Cantidad de casos cerrados',
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
