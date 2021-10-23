'use strict'

module.exports = function CasesController({
  controllerWrapper,
  casesProvider,
  user: { userGUID: UserGuid, userName },
}) {
  return {
    getGroupedCases(req, res, next) {
      return controllerWrapper.async(
        { UserGuid, userName },
        casesProvider.groupedCasesProvider,
        res,
        next
      )
    },

    getCases(req, res, next) {
      const { filter } = req.query

      return controllerWrapper.async(
        { filter, UserGuid, userName },
        casesProvider.obtainCasesByStateOrSocialMedia,
        res,
        next
      )
    },
  }
}
