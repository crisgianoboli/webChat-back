'use strict'

const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const auxiliariesController = require('../../../controllers/auxiliariesController')

module.exports = function () {
  const api = makeInvoker(auxiliariesController)
  const operations = {
    get: [jwtDecode, api('getAuxiliaries')],
  }
  operations.get.apiDoc = {
    description: 'Get Auxiliaries',
    operationId: 'getAuxiliaries',
    tags: ['auxiliaries'],
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
                eventTypeId: {
                  type: 'number',
                  format: 'int32',
                  description: 'ID del tipo de evento',
                },
                eventTypeInternalCode: {
                  type: 'number',
                  format: 'int32',
                  description: 'Código interno del evento',
                },
                eventTypeManageCase: {
                  type: 'boolean',
                  description:
                    'bit que indica si la pausa seleccionada permite continuar gestionando',
                },
                eventTypeName: {
                  type: 'string',
                  example: 'Médico',
                  description: 'Nombre del evento',
                },
                eventTypingInternalCode: {
                  type: 'number',
                  format: 'int32',
                  description:
                    'código interno del tipo de auxiliar no bloqueante',
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
