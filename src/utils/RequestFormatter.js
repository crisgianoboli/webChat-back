'use strict'

module.exports = function RequestFormatter({ user: { userName, userGUID } }) {
  function getContextInformation() {
    return {
      //TODO deshardcodear
      Culture: 'es-AR',
      ProviderNameWithCultureInfo: '',
      //TODO deshardcodear
      HostName: '201.234.32.229', //ip
      //TODO deshardcodear
      HostIp: '201.234.32.229', //ip
      HostTime: new Date().toISOString(),
      ServerTime: new Date().toISOString(),
      userName,
      userId: userGUID,
      //TODO deshardcodear
      AppId: 'epiron', //const
      //TODO deshardcodear
      ProviderName: 'epiron', //const
    }
  }

  return {
    format({ ServiceName, BusinessData }) {
      return {
        ServiceName,
        jsonRequest: {
          ContextInformation: getContextInformation(),
          BusinessData,
        },
      }
    },
  }
}
