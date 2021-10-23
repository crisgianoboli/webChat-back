'use strict'

const { makeInvoker } = require('awilix-express')
const loginController = require('../../../../controllers/login.controller')

module.exports = function () {
  const api = makeInvoker(loginController)

  const operations = {
    GET: [api('appInstance')],
  }

  operations.GET.apiDoc = {
    description: 'AppInstance',
    operationId: 'appInstance',
    tags: ['auth'],
    //TODO complete de response
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                eventTypeId: {
                  type: 'number',
                  format: 'int32',
                  description: 'ID del tipo de evento',
                },
              },
            },
          },
        },
      },
    },
  }
  /*
{
   "ApplicationName":"Configurador de la Gestion",
   "ApplicationInstanceName":"Configurador - Telefónica",
   "AuthTypes":[
      {
         "AuthenticationTypeName":"Autenticación propia de la aplicación",
         "AuthenticationTypeTag":"OWN",
         "AuthenticationTypeGUID":"5ad5a762-d147-e311-a348-000c292448bd"
      },
      {
         "AuthenticationTypeName":"Autenticación Windows",
         "AuthenticationTypeTag":"WINDOWS",
         "AuthenticationTypeGUID":"0471220c-d147-e311-a348-000c292448bd"
      }
   ],
   "Domains":[
      {
         "DomainName":"ALLUS-AR",
         "DomainGUID":"2a27e413-12ac-e611-96ba-0050568f3ddd"
      },
      {
         "DomainName":"ALCOMOVISTAR",
         "DomainGUID":"cdf9f6d6-11ac-e611-96ba-0050568f3ddd"
      },
      {
         "DomainName":"ALLUS-PE",
         "DomainGUID":"a40d86da-d001-e811-80d0-005056a9adf3"
      }
   ],
   "requestGUID":"51b54551-0358-4055-a1fe-2608ddca4af1"
}
*/
  return operations
}
