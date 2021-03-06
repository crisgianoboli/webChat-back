'use strict'

const { makeInvoker } = require('awilix-express')
const observationsController = require('../../../../../controllers/sidebar/observationsController')
const {
  jwtDecode,
} = require('../../../../../middlewares/validations/jwtDecode')

module.exports = function () {
  const api = makeInvoker(observationsController)
  const operations = {
    get: [jwtDecode, api('getObservations')],
    put: [jwtDecode, api('editObservations')],
    post: [jwtDecode, api('newObservations')],
  }
 operations.get.apiDoc = {
    description: 'Get Observations by caseId',
    operationId: 'getObservationsByCaseId',
    tags: ['observations'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'caseId',
        required: false,
        description: 'Id del caso',
      },
    ],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  operations.put.apiDoc = {
    description: 'Edit Observation by caseId',
    operationId: 'editObservationByCaseId',
    tags: ['observations'],
    parameters: [
      {
        in: 'path',
        name: 'caseId',
        required: false,
        description: 'ID del caso',
      },
    ],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  operations.post.apiDoc = {
    description: 'Create Observation by caseId',
    operationId: 'createObservationByCaseId',
    tags: ['observations'],
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
        description: 'ID del caso',
        example: 118161,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              Description: {
                type: 'string',
                example: 'Observaci??n nueva',
                description: 'Descripci??n de la observaci??n',
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
                CaseId: {
                  type: 'integer',
                  description: 'Identificador del caso.',
                },
                Crud: {
                  type: 'integer',
                  description:
                    'Determina la operaci??n ABM en que se encuentra la observaci??n.',
                },
                Description: {
                  type: 'string',
                  description: 'Descripci??n de la observaci??n',
                },
                ModifiedByUserId: {
                  type: 'integer',
                  description:
                    'Identificador del usuario que modific?? la observaci??n.',
                },
                ModifiedDate: {
                  type: 'string',
                  description: 'Fecha de ??ltima modificaci??n.',
                },
                ObservationCreationDate: {
                  type: 'string',
                  description: 'Fecha de creaci??n de la observaci??n.',
                },
                ObservationId: {
                  type: 'integer',
                  description: 'Identificador de la observaci??n.',
                },
                PersonFullName: {
                  type: 'string',
                  description: 'Nombre completo de la persona. (agente)',
                },
                UserName: {
                  type: 'string',
                  description: 'Nombre del usuario. (agente)',
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
