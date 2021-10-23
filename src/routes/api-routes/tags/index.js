'use strict'

const tagsController = require('../../../controllers/tagsController')
const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(tagsController)
  const operations = {
    POST: [jwtDecode, api('setTagAtComment')],
  }

  operations.POST.apiDoc = {
    description: 'Set Tag At Comment',
    operationId: 'setTagAtComment',
    tags: ['tags'],
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
              caseCommentId: {
                type: 'integer',
                example: 345237,
                description: 'ID del comentario',
              },
              userId: {
                type: 'integer',
                example: 237,
                description: 'ID del usuario logueado',
              },
              selectedTags: {
                type: 'array',
                example: [{ tag1: 'tag1' }, { tag2: 'tag2' }, { tag3: 'tag3' }],
                description: 'Array de tags a asignar',
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
                CaseCommentTagId: {
                  type: 'integer',
                  description: 'ID de la relacion comentario / tag',
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
