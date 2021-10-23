'use strict'

const {
  jwtDecode,
} = require('../../../../../middlewares/validations/jwtDecode')
const observationsController = require('../../../../../controllers/sidebar/observationsController')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(observationsController)
  const operations = {
    get: [jwtDecode, api('searchAttacmentsInObservations')],
  }
  operations.get.apiDoc = {
    description: 'Get Attachments Observations by CaseId',
    operationId: 'getAttachmentsObservationsByCaseId',
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
        description: 'Id de caso',
      },
    ],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
      },
    },
  }

  return operations
}
