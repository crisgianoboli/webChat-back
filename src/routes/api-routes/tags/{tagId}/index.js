/* eslint-disable sonarjs/no-duplicate-string */
'use strict'

const tagsController = require('../../../../controllers/tagsController')
const { jwtDecode } = require('../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(tagsController)
  const operations = {
    patch: [jwtDecode, api('deleteTagController')],
    PUT: [jwtDecode, api('modifiedTag')],
  }

  operations.patch.apiDoc = {
    description: 'Delete Tag',
    operationId: 'deleteTag',
    tags: ['tags'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'tagId',
        description: 'ID del tag',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              groupAccountId: {
                type: 'integer',
                example: '2',
                description: 'ID del grupo de cuenta',
              },
              caseCommentId: {
                type: 'number',
                example: 345237,
                description: 'ID del comentario',
              },
              userId: {
                type: 'integer',
                description:
                  'ID del usuario logueado en la herramienta. Valor obtenido del enterCase.userAssignedId',
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
                CaseCommentId: {
                  type: 'integer',
                  description: 'ID del comentario del caso',
                },
                CaseCommentTagActiveFlag: {
                  type: 'boolean',
                  description:
                    'Bit que indica si el tag está activo, valor que llega: false',
                },
                CaseCommentTagLogTransaction: {
                  type: 'string',
                  description:
                    'Carácter que identifica el tipo de transacción, valor que llega: "D"',
                },
                CaseCommentTagModifiedByUser: {
                  type: 'integer',
                  description:
                    'ID del usuario que está eliminando el tag al comentario',
                },
                TagId: {
                  type: 'integer',
                  description: 'ID del tag',
                },
                CaseCommentTagCreated: {
                  type: 'string',
                  description:
                    'Fecha de creación del tag en el comentario, valor que llega: DateTime.MinDate, Ejemplo: 01/01/0001 0:00:00',
                },
                CaseCommentTagId: {
                  type: 'integer',
                  description:
                    'ID del tag en el comentario, valor que llega: 0',
                },
                GroupAccountId: {
                  type: 'integer',
                  description: 'ID del grupo de cuenta, valor que llega: 0',
                },
                TagName: {
                  type: 'string',
                  description: 'Nombre del tag, valor que llega: null',
                },
              },
            },
          },
        },
      },
    },
  }

  operations.PUT.apiDoc = {
    description: 'Modified Tag',
    operationId: 'modifiedTag',
    tags: ['tags'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'tagId',
        description: 'ID del tag',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              tagName: {
                type: 'string',
                example: 'Nuevo nombre del tag',
                description: 'Nuevo nombre del tag',
              },
              userId: {
                type: 'integer',
                example: 237,
                description: 'ID del usuario logueado',
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
                TagId: {
                  type: 'integer',
                  description: 'ID del tag modificado',
                },
                GroupAccountId: {
                  type: 'integer',
                  description: 'ID del grupo de cuenta',
                },
                TagName: {
                  type: 'string',
                  description: 'Nombre modificado del tag',
                },
                TagActiveFlag: {
                  type: 'boolean',
                  description: 'Bit que indica si el tag está disponible',
                },
                TagCreated: {
                  type: 'string',
                  description: 'Fecha de creación del tag',
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
