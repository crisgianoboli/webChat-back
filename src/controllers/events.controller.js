'use strict'

module.exports = function eventsController({
  eventsProvider,
  controllerWrapper,
}) {
  return {
    register(req, res, next) {
      const params = req.body
      return controllerWrapper.async(params, eventsProvider.register, res, next)
    },
  }
}
