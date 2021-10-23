'use strict'

module.exports = function logoutController({
  controllerWrapper,
  logoutProvider,
}) {
  return {
    logout(req, res, next) {
      const {
        userId,
        userInfo: { ControlLoguin },
      } = req.user
      return controllerWrapper.async(
        {
          ...req.body,
          userId,
          automaticLogout: ControlLoguin,
        },
        logoutProvider.logout,
        res,
        next
      )
    },
  }
}
