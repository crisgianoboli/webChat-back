'use strict'

const tagsController = require('../../../../../controllers/tagsController')
const {
  jwtDecode,
} = require('../../../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(tagsController)
  const operations = {
    GET: [jwtDecode, api('getTagsController')],
    POST: [jwtDecode, api('createTagController')],
  }

  operations.GET.apiDoc = {
    description: 'Get Tags',
    operationId: 'getTags',
    tags: ['tags'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'groupAccountId',
        required: true,
      },
      {
        in: 'query',
        name: 'allowUserToCreateTags',
        required: true,
      },
      {
        in: 'query',
        name: 'managementCaseId',
        required: false,
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
                AllowTagView: {
                  type: 'boolean',
                  description:
                    'Bit que indica si el usuario puede ver los tags',
                },
                AllowUserToCreateTags: {
                  type: 'boolean',
                  description: 'Bit que indica si el usuario puede crear tags',
                },
                AutomatedTaggedFlag: {
                  type: 'boolean',
                  description: 'Bit que indica si se asigna un tag automático',
                },
                CaseCommentId: {
                  type: 'number',
                  format: 'int64',
                  description:
                    'ID del comentario del caso, por defecto llega 0 ',
                },
                CaseCommentTagCreated: {
                  type: 'string',
                  description: 'Fecha de creación del tag en el comentario',
                },
                CaseCommentTagId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del tag en el comentario',
                },
                CaseId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del caso, por defecto llega 0',
                },
                CaseTagCreated: {
                  type: 'string',
                  description:
                    'Fecha de creación del tag en el caso, por defecto llega: DateTime.MinDate ',
                },
                CaseTagId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del tag en el caso',
                },
                ConversationId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID de la conversación',
                },
                ConversationTagId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del tag en la conversación',
                },
                GroupAccountId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del grupo de cuenta',
                },
                GroupTagId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del grupo de tags',
                },
                GroupTagName: {
                  type: 'string',
                  description:
                    'Nombre del grupo de tag, ejemplo: "Red neuronal" ',
                },
                ShowPriotiry: {
                  type: 'number',
                  format: 'int64',
                  description: 'Prioridad de visualización del tag',
                },
                TagActiveFlag: {
                  type: 'boolean',
                  description:
                    'Bit que indica si el tag está activo para gestión',
                },
                TagCreated: {
                  type: 'string',
                  description: 'Fecha de creación del tag',
                },
                TagId: {
                  type: 'number',
                  format: 'int64',
                  description: 'ID del tag',
                },
                TagModifiedByUser: {
                  type: 'number',
                  format: 'int64',
                  description: 'Usuario que modificó el tag',
                },
                TagName: {
                  type: 'string',
                  description: 'Nombre del tag, ejemplo: "Activación" ',
                },
                TagTypeInternalCode: {
                  type: 'number',
                  format: 'int64',
                  description: 'Código interno del tipo de tag',
                },
                TagTypeName: {
                  type: 'string',
                  description: 'Nombre del tipo de tag, ejemplo: "Automatico" ',
                },
                ValidationMessage: {
                  type: 'string',
                  description:
                    'Mensaje de validación, por defecto llega: null ',
                },
              },
            },
          },
        },
      },
    },
  }

  operations.POST.apiDoc = {
    description: 'Create Tag',
    operationId: 'createTag',
    tags: ['tags'],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'path',
        name: 'groupAccountId',
        description: 'ID del grupo de cuenta',
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
                example: 'Comentario de ejemplo',
                description:
                  'Nombre del tag. Valor obtenido del control de texto',
              },
              userAssignedId: {
                type: 'integer',
                example: 237,
                description:
                  'ID del usuario logueado en la herramienta. Valor obtenido del enterCase.userAssignedId',
              },
              caseCommentId: {
                type: 'integer',
                example: 345237,
                description: 'ID del comentario',
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
                  description: 'ID del tag creado',
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
