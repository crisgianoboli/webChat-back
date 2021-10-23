'use strict'

module.exports = function loginController({
  controllerWrapper,
  loginProvider,
}) {
  return {
    appInstance(req, res, next) {
      return controllerWrapper.async(
        {},
        loginProvider.appInstanceApi,
        res,
        next
      )
    },

    login(req, res, next) {
      return controllerWrapper.async(
        {
          ...req.body,
        },
        loginProvider.login,
        res,
        next
      )
    },

    getVerificationCode(req, res, next) {
      return controllerWrapper.async(
        {
          ...req.body,
        },
        loginProvider.verificationCode,
        res,
        next
      )
    },

    changePassword(req, res, next) {
      return controllerWrapper.async(
        {
          ...req.body,
        },
        loginProvider.changePassword,
        res,
        next
      )
    },

    getUser(req, res, next) {
      return controllerWrapper.async(
        {
          authorization: req.headers.authorization,
        },
        loginProvider.getUserSession,
        res,
        next
      )
    },
  }
}
