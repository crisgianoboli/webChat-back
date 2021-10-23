'use strict'

const casesController = require('../../../controllers/casesController')
const { jwtDecode } = require('../../../middlewares/validations/jwtDecode')
const { makeInvoker } = require('awilix-express')

module.exports = function () {
  const api = makeInvoker(casesController)
  const operations = {
    get: [jwtDecode, api('getCases')],
  }
  operations.get.apiDoc = {
    description: 'Get all cases',
    operationId: 'getAllCases',
    tags: ['cases'],
    security: [
      {
        bearearAuth: [],
      },
    ],
    parameters: [
      {
        in: 'header',
        name: 'profile',
        required: true,
      },
      {
        in: 'query',
        name: 'filter',
        required: false,
        description:
          'Filtro de red social, si es vacío, se obtienen todos los casos',
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              // TODO queda pendiente modificar el controlador para que devuelva solo estas properties.
              properties: {
                CaseId: {
                  type: 'number',
                  format: 'int64',
                  description: 'Id del caso',
                },
                ClientFullName: {
                  type: 'string',
                  description: 'Nombre completo real del Cliente',
                },
                Followers: {
                  type: 'integer',
                  format: 'int64',
                  description: 'Cantidad de seguidores.',
                },
                CaseCreated: {
                  type: 'string',
                  description:
                    'Fecha en la que se creó el caso. No se modifica nunca.',
                },
                CaseModifiedDate: {
                  type: 'string',
                  description: 'Fecha en la que se modificó el caso.',
                },
                TimeLastComentClient: {
                  type: 'string',
                  description:
                    'Tiempo transcurrido desde que el cliente envió su último mensaje (tiempo que el cliente lleva esperando respuesta).',
                },
                Notifications: {
                  type: 'string',
                  description:
                    'Cantidad de notificaciones, mensajes entrantes sin leer en el caso.',
                },
                Cliente: {
                  type: 'string',
                  description: `Esta columna indica si el última comentario del caso es del cliente o del representante. Se usa entre varias. Cosas para saber que icono poner al principio (muñeco verde, muñeco rojo)
                    </br>0: Comentario del representante
                    </br>1: Ultimo comentario fue del cliente
                    </br>2: Canal es chat y el cliente se contacta a través de un celular y el último mensaje es del representante
                    </br>3: Canal es chat y el cliente se contacta a través de un celular y el último mensaje es del cliente)
                    </br>4: Comentario de bot
                    `,
                },
                StateName: {
                  type: 'string',
                  description:
                    'Nombre o descripción del estado que posee el caso.',
                },
                UCUserName: {
                  type: 'string',
                  description:
                    'Nombre del usuario. En el canal (sea face, twitter, etc.) Seria el usuario que se contacta a través de la red social. ',
                },
                CaseTypeName: {
                  type: 'string',
                  description:
                    'Entrante" Para cuando el caso fue generado por el cliente y “Saliente” para cuando el caso se generó desde Epiron al Cliente.',
                },
                AttentionQueueName: {
                  type: 'string',
                  description: 'Nombre de la cola que tiene asignado el caso.',
                },
                ProfileImage: {
                  type: 'string',
                  description: 'La imagen o avatar del usuario en el canal',
                },
                ChannelIcon: {
                  type: 'string',
                  format: 'byte',
                },
                AlertColorsCode: {
                  type: 'string',
                  description:
                    'Código de color. Depende del tiempo que lleva el cliente esperando respuesta. Indica si es verde, amarillo o rojo. (Depende de las configuraciones)',
                },
                CaseOrigin: {
                  type: 'string',
                  description: `El canal de origen del caso determinado por el SCInternal Code. (Facebook, Twitter, Etc)
                    </br>0: 'Casos Cerrados'
                    </br>1: 'Mail'
                    </br>2: 'Twitter'
                    </br>3: 'Facebook'
                    </br>4: 'SMS'
                    </br>5: 'Telegram'
                    </br>6: 'MercadoLibre'
                    </br>7: 'Mensajero'
                    </br>8: 'Chat'
                    </br>9: 'VideoConferencia'
                    </br>10:'ApiChat'
                    </br>11:'Instagram'
                    </br>12:'Youtube'
                    </br>13:'WhatsApp'
                    </br>14:'GooglePlay'`,
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
