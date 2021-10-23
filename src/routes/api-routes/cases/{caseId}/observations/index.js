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
                example: 'Observación nueva',
                description: 'Descripción de la observación',
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
                    'Determina la operación ABM en que se encuentra la observación.',
                },
                Description: {
                  type: 'string',
                  description: 'Descripción de la observación',
                },
                ModifiedByUserId: {
                  type: 'integer',
                  description:
                    'Identificador del usuario que modificó la observación.',
                },
                ModifiedDate: {
                  type: 'string',
                  description: 'Fecha de última modificación.',
                },
                ObservationCreationDate: {
                  type: 'string',
                  description: 'Fecha de creación de la observación.',
                },
                ObservationId: {
                  type: 'integer',
                  description: 'Identificador de la observación.',
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
