'use strict'

const { makeInvoker } = require('awilix-express')
const eventsController = require('../../../controllers/events.controller')
const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')

module.exports = function () {
  const api = makeInvoker(eventsController)

  const operations = {
    POST: [jwtDecode, api('register')],
  }

  operations.POST.apiDoc = {
    description: 'Register a new event',
    operationId: 'registerEvent',
    tags: ['events'],
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
              EventTypeId: {
                type: 'number',
                nullable: true,
                example: '18',
              },
              EventTypeInternalCode: {
                type: 'number',
                nullable: true,
                example: '1',
              },
              EventTypeManageCase: {
                type: 'boolean',
                nullable: true,
                example: 'true',
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
                StatusCode: {
                  type: 'number',
                  example: '1',
                  description: 'Operation Result',
                },
                RunningDescription: {
                  type: 'string',
                  example: 'Values inserted correctly.',
                  description: 'Result state',
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
