'use strict'

module.exports = function LoginApi({
  loginClient,
  objectUtils,
  config: {
    login: { instance: providerInstance },
  },
}) {
  return {

    getUserSession({ authorization }){
      return loginClient.post('/getUserSession',{},{headers: {Authorization: authorization}}).then(({ data }) => data)
    }, 

    login({ appInstance, username, password, authType, domain }) {
      const request = {
        username,
        password,
        authTypeGuid: objectUtils.getObject(
          appInstance,
          'AuthTypes',
          'AuthenticationTypeTag',
          authType
        )['AuthenticationTypeGUID'],
        token: appInstance['requestGUID'],
        instance: providerInstance,
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
      return loginClient.post('/authenticate', request).then(({ data }) => data)
    },

    verificationCode({ username, email, appInstance }) {
      return loginClient
        .post('/forgotPassword', {
          username,
          email,
          AppInstanceGuid: providerInstance,
          LoginHost: null,
          LoginIp: '192.3.4.123',
          token: appInstance['requestGUID'],
        })
        .then(({ data }) => data)
    },

    changePassword({ username, newPassword: NewPassword, code, appInstance }) {
      return loginClient
        .post('/forgotPasswordWithCode', {
          username,
          NewPassword,
          code,
          AppInstanceGuid: providerInstance,
          //TODO get parameters from work station
          LoginHost: null,
          //TODO get from nginx
          LoginIp: '192.3.4.123',
          token: appInstance['requestGUID'],
        })
        .then(({ data }) => data)
    },

    logout({
      userId: UserId,
      onPause: OnPause,
      additionalInformation: AdditionalInformation,
      automaticLogout: AutomaticLogout,
      authorization,
    }) {
      return loginClient
        .post(
          '/logout',
          {
            UserId,
            OnPause,
            //TODO Información que contiene IP de la estación, fecha del sistema, versión de la aplicación.
            AdditionalInformation,
            AutomaticLogout,
          },
          {
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          }
        )
        .then(({ data }) => data)
    },
  }
}
