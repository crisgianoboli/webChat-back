'use strict'

module.exports = function loginProvider({ logoutApi }) {
  return {
    logout({ userId, onPause, automaticLogout, authorization }) {
      const additionalInformation = '123.12.123.125, 30/02/50, Epiron V0'
      return logoutApi.logout({
        userId,
        authorization,
        onPause,
        additionalInformation,
        automaticLogout,
      })
    },
  }
}
