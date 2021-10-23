'use strict'

const { makeInvoker } = require('awilix-express')
const {
  jwtDecode,
} = require('../../../../../../middlewares/validations/jwtDecode')
const observationsController = require('../../../../../../controllers/sidebar/observationsController')

module.exports = function () {
  const api = makeInvoker(observationsController)
  const operations = {
    get: [jwtDecode, api('getBinaryFile')],
  }

  operations.get.apiDoc = {
    description: 'Get Binary File',
    operationId: 'getBinaryFile',
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
      {
        in: 'path',
        name: 'observationsFileAttachmentId',
        required: true,
        description: 'ID del binario.',
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
                AttachmentLenght: {
                  type: 'integer',
                  description: 'Tamaño del archivo adjunto.',
                },
                CaseFileId: {
                  type: 'integer',
                  description:
                    'Identificador del caso donde se adjunta el archivo de observación.',
                },
                CaseId: {
                  type: 'integer',
                  description: 'Identificador del caso.',
                },
                CreationTimeElapsed: {
                  type: 'integer',
                  description:
                    'Tiempo en segundos transcurrido desde la creación de la observación.',
                },
                IsNew: {
                  type: 'boolean',
                  description: 'Determina si el archivo adjunto es nuevo.',
                },
                MediaCategory: {
                  type: 'string',
                  description: 'Categoría de tipo del archivo adjunto',
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
                ObservationsFileAttachment: {
                  type: 'string',
                  description: 'Contenido del archivo adjunto.',
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
                ObservationsFileAttachmentLink: {
                  type: 'string',
                  description: 'Enlace del archivo adjunto.',
                },
                ObservationsFileAttachmentName: {
                  type: 'string',
                  description: 'Nombre del archivo adjunto.',
                },
                ObservationsFileAttachmentOnBodyContent: {
                  type: 'string',
                  description: '',
                },
                ObservationsFileIsAttachmentOnBody: {
                  type: 'boolean',
                  description: '',
                },
                ObservationsFileTransferEncoding: {
                  type: 'string',
                  description: '',
                },
                TemplateJSON: {
                  type: 'string',
                  description:
                    'Plantilla en formato JSON con el contenido del archivo adjunto.',
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
