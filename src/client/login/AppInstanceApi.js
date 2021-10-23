'use strict'

module.exports = function AppInstanceApi({
  loginClient,
  config: {
    login: { instance: providerInstance },
  },
}) {
  return {
    get() {
      return loginClient
        .get(`/getAppInstance?instance=${providerInstance}`)
        .then(({ data }) => data)
    },
  }
}
