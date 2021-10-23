'use strict'

const { makeInvoker } = require('awilix-express')

const {
  jwtDecode,
} = require('../../../../../middlewares/validations/jwtDecode')
const caseController = require('../../../../../controllers/caseController')

const NUMBER = 'number'
const INT64 = 'int64'

module.exports = function () {
  const api = makeInvoker(caseController)

  const operations = {
    get: [jwtDecode, api('getManagmentCaseEnterController')],
  }
  //FIXME se tendria q poder mandar sin profile y q no rompa
  operations.get.apiDoc = {
    description: 'get managment case enter',
    operationId: 'getManagmentCaseEnter',
    tags: ['cases'],
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
        description: 'Id de caso',
      },
      {
        in: 'query',
        name: 'onPause',
        required: false,
        description: 'Estado del eperador',
      },
    ],
    //TODO complete de response
    // TODO queda pendiente modificar el controlador para que devuelva solo estas properties.
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                CaseId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'Id del caso',
                },
                ClientId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'Id del cliente',
                },
                ClientName: {
                  type: 'string',
                  description: 'Nombre del cliente',
                },
                AccountId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID de la Unidad de Negocio',
                },
                AccountTypeId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'Id de la Empresa',
                },
                SCInternalCode: {
                  type: NUMBER,
                  format: INT64,
                  description:
                    'Código interno del canal al cual pertenece el caso',
                },
                CaseTypeInternalCode: {
                  type: NUMBER,
                  format: INT64,
                  description: 'Código interno del tipo de caso.',
                },
                UserAssignedId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID del usuario asignado al caso',
                },
                StateId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID del estado, que tiene el caso',
                },
                ClassificationDetailId: {
                  type: NUMBER,
                  format: INT64,
                  description:
                    'ID del detalle de clasificación, que tiene el caso',
                },
                AccountDetailId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID de la cuenta.',
                },
                UserChannelId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID del usuario que generó el caso',
                },
                GroupAccountId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID del grupo de cuenta.',
                },
                AttentionQueueId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID de la cola de atención ',
                },
                ElementTypeId: {
                  type: NUMBER,
                  format: INT64,
                  description:
                    'ID del tipo de elemento por el cual se generó el caso ',
                },
                ConversationId: {
                  type: NUMBER,
                  format: INT64,
                  description: 'ID de la conversación.',
                },
                AttentionQueueEnablesScaling: {
                  type: 'boolean',
                  description:
                    'Bit que indica si se habilita o no la sección de escalamiento, por cola de atención.',
                },
                AttentionQueueClasificationId: {
                  type: NUMBER,
                  format: INT64,
                  description:
                    'ID del árbol de clasificación configurado para la cola a la cual pertenece el caso.',
                },
                AttentionQueueSelectClassification: {
                  type: 'boolean',
                  description:
                    'Bit que indica si es una cola de atención tiene configurado un árbol de clasificación.',
                },
                GroupAccount: {
                  type: 'object',
                  properties: {
                    AllowUserToCreateTags: {
                      type: 'boolean',
                      description:
                        'Bit que indica si el usuario puede crear tags.',
                    },
                    GroupAccountAlertMessagePriorToClosing: {
                      type: 'boolean',
                    },
                    GroupAccountEnableButtonXGestor: {
                      type: 'boolean',
                      description:
                        'Bit que indica si se habilita la opción salir del caso',
                    },
                    GroupAccountReleaseCaseTime: {
                      type: NUMBER,
                      format: INT64,
                      description: 'tiempo de bloqueo del caso.',
                    },
                  },
                },
                BlockedGuid: {
                  type: 'string',
                  description: 'GUID de bloqueo del caso',
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
