'use strict'

const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')
const loginController = require('../../../../controllers/login.controller')

module.exports = function () {
  const api = makeInvoker(loginController)

  const operations = {
    GET: [jwtDecode, api('getUser')],
  }

  operations.GET.apiDoc = {
    description: 'getUserSession',
    operationId: 'userSession',
    tags: ['auth'],
    parameters: [
      //FIXME en realidad no se debería necesitar el header, el problema está en que hay un solo middleware que siempre chequea éste header y el auth bearer header
      {
        in: 'header',
        name: 'profile',
        required: true,
      }
    ],
    responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                // TODO queda pendiente modificar el controlador para que devuelva solo estas properties.
                properties: {
                  userName: {
                    type: 'string',
                    description: 'Nombre usuario',
                    example: 'esolution',
                  },
                  AllowAutomatedTagView: {
                    type: 'boolean',
                    description: 'Permiso para ver tag',
                    example: true,
                  },
                  PersonAutomaticOpenCases: {
                    type: 'boolean',
                    description: 'Averiguar',
                    example: false,
                  },
                  AssigmentCaseTypeInternalCode: {
                    type: 'integer',
                    description: 'Averiguar',
                    example: 1,
                  },
                  AssigmentCaseTypeName: {
                    type: 'string',
                    description: 'Averiguar',
                    example: 'Estados',
                  },
                  ControlLoguin: {
                    type: 'boolean',
                    description: 'Averiguar',
                    example: true,
                  },
                  EventTimeReleaseList: {
                    type: 'string',
                    description: 'Averiguar',
                    example: null,
                  },
                  PersonFullName: {
                    type: 'string',
                    description: `Averiguar`,
                    example: 'esolutions esolutions',
                  },
                  NewRecordsToAssign: {
                    type: 'integer',
                    description: 'Nombre o descripción del estado que posee el caso.',
                    example: 3,
                  },
                  PendingRecordToAssign: {
                    type: 'integer',
                    description: 'Averiguar',
                    example: 6,
                  },
                  AccountAssigned: {
                    type: 'array',
                    description: 'Averiguar',
                    example: `
                    [
                        {
                            "AccountName": "Epiron PreProduccion 3.0",
                            "AccountId": 2
                        }
                    ]`,
                  },
                  Error: {
                    type: 'string',
                    description: 'Error',
                    example: 'null',
                  },
                  StatusCode: {
                      type: 'integer',
                      description: 'Status Code',
                      example: 200,
                  }
                },
              },
            },
          },
        },
      },
  }

  return operations
}