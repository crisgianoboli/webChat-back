'use strict'

module.exports = function AuxiliariesController({
  controllerWrapper,
  auxiliariesProvider,
}) {
  return {
    getAuxiliaries(req, res, next) {
      //TODO check
      return controllerWrapper.async(
        {},
        auxiliariesProvider.obtainAuxiliaries,
        res,
        next
      )
    },
    getCurrentEvent(req, res, next) {
      const { isNull, excludePauses } = req.body
      return controllerWrapper.async(
        { isNull, excludePauses },
        auxiliariesProvider.obtainCurrentEvent,
        res,
        next
      )
    },
  }
}
