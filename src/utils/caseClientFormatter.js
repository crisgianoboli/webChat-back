/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-param-reassign */

'use strict'
const uniqid = require('uniqid')

module.exports = function CaseClientFormatter() {
  return {
    clientDevolutionFormatter(data) {
      const {
        AttributeList,
        Client: { Nombre, Apellido, Observaciones, ...props },
      } = data

      const ClientAttribute = []

      const Client = {
        ...props,
        ClientFirstName: Nombre,
        ClientLastName: Apellido,
        ClientObservation: Observaciones,
      }

      for (const property in AttributeList) {
        ClientAttribute.push({
          ClientAttributeId: property.split('_')[0],
          Value: AttributeList[property],
        })
      }

      return {
        ...Client,
        ClientAttribute,
      }
    },

    formatInformationGeneral(clientServiceData) {
      return {
        ClientAttributeGroupName: 'Informacion general',
        AttributeList: [
          {
            ObjectTypeInternalCode: 1,
            ClientAttributeName: 'Nombre',
            Value: clientServiceData.ClientFirstName,
          },
          {
            ObjectTypeInternalCode: 1,
            ClientAttributeName: 'Apellido',
            Value: clientServiceData.ClientLastName,
          },
          {
            ObjectTypeInternalCode: 4,
            ClientAttributeName: 'Observaciones',
            Value: clientServiceData.ClientObservation,
          },
        ],
      }
    },

    addAtributteUniqueHash(arr) {
      arr.forEach(({ AttributeList }) => {
        AttributeList.forEach(e => {
          e.hash = uniqid.time()
        })
      })
    },

    replaceProperties(
      clientAttrData,
      formatInformationGeneral,
      addAtributteUniqueHash
    ) {
      clientAttrData.Client =
        clientAttrData.Client === null
          ? {
              ClientId: null,
              ClientFirstName: '',
              ClientLastName: '',
              ClientObservation: '',
            }
          : clientAttrData.Client

      const arr = Array.from(clientAttrData.ClientAttributeGroupList)
      arr.unshift(
        {
          ClientAttributeGroupName: 'Cuentas asociadas',
          AttributeList: clientAttrData.UserChannelList,
        },
        formatInformationGeneral(clientAttrData.Client)
      )
      addAtributteUniqueHash(arr)
      return arr
    },
  }
}
