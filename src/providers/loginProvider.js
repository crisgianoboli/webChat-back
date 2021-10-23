'use strict'

const jwt = require('jsonwebtoken')

module.exports = function loginProvider({
  config: {
    login: {
      profile_settings: { key, iat, algorithm },
    },
  },
  appInstanceApi,
  loginApi,
}) {
  return {
    async appInstanceApi() {
      const { AuthTypes, Domains } = await appInstanceApi.get()
      return { AuthTypes, Domains }
    },

    async login({ username, password, authType, domain }) {
      const appInstance = await appInstanceApi.get()

      const { token, refresh_token, UserSession } = await loginApi.login({
        appInstance,
        username,
        password,
        authType,
        domain,
      })

      // const menuInstance = await menuPermisosApi.get({
      //   appInstance,
      //   authType,
      //   domain,
      //   requestGUID,
      //   })
      const profile_token = jwt.sign(
        {
          UserSession,
        },
        key,
        { algorithm },
        { expiresIn: iat }
      )
      return {
        //TODO validate response
        //FIXME se le podría devolver menos información al front?
        token,
        profile_token,
        refresh_token,
      }
    },

    async verificationCode({ username, email }) {
      const appInstance = await appInstanceApi.get()
      return loginApi.verificationCode({
        username,
        email,
        appInstance,
      })
    },

    async changePassword({ username, code, newPassword }) {
      const appInstance = await appInstanceApi.get()
      return loginApi.changePassword({
        username,
        newPassword,
        code,
        appInstance,
      })
    },

    getUserSession({ authorization }){
      return loginApi.getUserSession({ authorization})
    },

  }
}
