'use strict'

const {
  jwtDecode,
} = require('../../../../../../middlewares/validations/jwtDecode')
const observationsController = require('../../../../../../controllers/sidebar/observationsController')
const multer = require('multer')
const { makeInvoker } = require('awilix-express')
const upload = multer()

module.exports = function () {
  const api = makeInvoker(observationsController)
  const operations = {
    get: [jwtDecode, api('getConfiguration')],
    post: [
      jwtDecode,
      upload.single('fileBase64'),
      api('saveAttachmentsInObservations'),
    ],
  }

  
  operations.get.apiDoc = {
    description: 'Get Configurations',
    operationId: 'getConfigurations',
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
        example: 118161,
      },
      {
        in: 'path',
        name: 'accountId',
        required: true,
        description: 'Id de la cuenta',
        example: 2,
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
                AccountObservationDetail: {
                  type: 'integer',
                  description: 'Identificador de la configuración de observación por unidad de negocio.',
                },
                AccountId: {
                  type: 'integer',
                  description: 'Identificador de la unidad de negocio.',
                },
                AodActiveFlag: {
                  type: 'boolean',
                  description: 'Determina si la configuración está activa.',
                },
                AodCreated: {
                  type: 'string',
                  description: 'Fecha de creación del registro.',
                },
                AodModifiedByUser: {
                  type: 'integer',
                  description: 'Ultimo usuario que modificó el registro.',
                },
                AodModifiedDate: {
                  type: 'string',
                  description: 'Fecha de última modificación.',
                },
                FileFormatExtension: {
                  type: 'string',
                  description: 'Extensión de archivo.',
                },
                FileFormatId: {
                  type: 'integer',
                  description: 'Identificador del formato de archivo.',
                },
                FileSize: {
                  type: 'integer',
                  description: 'Máximo tamaño en byte del archivo.',
                },
              },
            },
          },
        },
      },
    },
  }
  
  
  operations.post.apiDoc = {
    description: 'Create Attachment Observation by caseId',
    operationId: 'createAttachment ObservationByCaseId',
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
        description: 'Id del caso',
        example: 118161,
      },
      {
        in: 'path',
        name: 'accountId',
        required: true,
        description: 'Id de la cuenta',
        example: 2,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              fileName: {
                type: 'string',
                example: 'PruebaDeImagen.png',
                description: 'Nombre del archivo',
              },
              fileBase64: {
                type: 'string',
                format: 'base64',
                example:
                  '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',
                description: 'Archivo en base 64',
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
                AttachmentLenght: {
                  type: 'integer',
                  description: 'Tamaño del archivo adjunto.',
                },
                CaseId: {
                  type: 'integer',
                  description: 'Identificador del caso.',
                },
                IsNew: {
                  type: 'boolean',
                  description: 'Determina si el archivo adjunto es nuevo.',
                },
                MediaTypeId: {
                  type: 'integer',
                  description: 'Identificador del tipo de archivo.',
                },
                MediaTypeName: {
                  type: 'string',
                  description: 'Nombre del tipo de archivo.',
                },
                ObservationsAttachmentModifiedByUser: {
                  type: 'integer',
                  description:
                    'Identificador del usuario que realizó la última modificación.',
                },
                ObservationsFileAttachmentCreated: {
                  type: 'string',
                  description: 'Fecha de creación del archivo adjunto.',
                },
                ObservationsFileAttachmentId: {
                  type: 'integer',
                  description:
                    'Identificador del archivo adjunto en la observaciones.',
                },
                ObservationsFileAttachmentName: {
                  type: 'string',
                  description: 'Nombre del archivo adjunto.',
                },
                UserName: {
                  type: 'string',
                  description:
                    'Nombre del usuario que agrego el archivo adjunto en la observación.',
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
