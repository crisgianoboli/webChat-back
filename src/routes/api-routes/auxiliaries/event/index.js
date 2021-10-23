'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const auxiliariesController = require('../../../../controllers/auxiliariesController')

module.exports = function () {
  const api = makeInvoker(auxiliariesController)
  const operations = {
    get: [jwtDecode, api('getCurrentEvent')],
  }
  operations.get.apiDoc = {
    description: 'Get Current Event',
    operationId: 'getCurrentEvent',
    tags: ['auxiliaries'],
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
              isNull: {
                type: 'boolean',
                example: false,
                description: 'Se para el valor:  false',
              },
              excludePauses: {
                type: 'boolean',
                example: true,
                description:
                  'Bit que indica si se debe excluir en la busqueda del ultimo evento los auxiliares. Se para el valor: true',
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
                EventLogId: {
                  type: 'number',
                  format: 'int32',
                  description: 'ID del log del evento',
                },
                EventTypeId: {
                  type: 'number',
                  format: 'int32',
                  description: 'ID del tipo de evento',
                },
                EventTypeInternalCode: {
                  type: 'number',
                  format: 'int32',
                  description: 'Código interno del evento',
                },
                EventTypeManageCase: {
                  type: 'boolean',
                  description:
                    'bit que indica si la pausa seleccionada permite continuar gestionando',
                },
                EventTypeName: {
                  type: 'string',
                  example: 'Médico',
                  description: 'Nombre del evento',
                },
                EventTypeTimeBar: {
                  type: 'boolean',
                  description: 'Bit que indica si es un auxiliar',
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
