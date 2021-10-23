'use strict'

function getContextInformation({ userName, UserGuid }) {
  return {
    Culture: 'es-AR',
    ProviderNameWithCultureInfo: '',
    HostName: '201.234.32.229', //ip
    HostIp: '201.234.32.229', //ip
    HostTime: new Date().toISOString(),
    ServerTime: new Date().toISOString(),
    userName,
    userId: UserGuid,
    AppId: 'epiron', //const
    ProviderName: 'epiron', //const
  }
}

function formatOptions({ ServiceName, BusinessData, ContextInformation }) {
  return {
    ServiceName,
    jsonRequest: {
      ContextInformation: getContextInformation(ContextInformation),
      BusinessData,
    },
  }
}

module.exports = {
  formatOptions,
  getContextInformation,
}
