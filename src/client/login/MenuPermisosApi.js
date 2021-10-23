'use strict'

module.exports = function MenuPermisosApi({
  loginClient,
  objectUtils,
  config: {
    login: { instance: providerInstance },
  },
}) {
  return {
    get({ authType, appInstance, requestGUID: guidIntercambio, domain }) {
      const { domainGuid } = {
        domainGuid:
          authType === 'OWN'
            ? null
            : objectUtils.getObject(
                appInstance,
                'Domains',
                'DomainName',
                domain
              )['DomainGUID'],
      }

      return loginClient
        .get(
          `/getMenuPermisos?instance=${providerInstance}&domainGuid=${domainGuid}&guidintercambio=${guidIntercambio}`
        )
        .then(({ data }) => data)
    },
  }
}
