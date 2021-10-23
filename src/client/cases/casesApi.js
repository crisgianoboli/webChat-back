'use strict'

const { groupBy } = require('lodash')

module.exports = function CasesApi({
  client,
  requestFormatter,
  requestBuilder,
  user: { userGUID: UserGuid },
}) {
  function obtainCases(body) {
    return requestBuilder
      .build(requestFormatter.format, body)
      .then(request => client.post('/', request))
      .then(r => r.data)
  }

  return {
    obtainOpenedCases() {
      return obtainCases({
        ServiceName: 'SearchCaseByUserGuidService',
        BusinessData: {
          UserGuid,
          State: 1,
        },
      })
    },

    obtainClosedCases() {
      return obtainCases({
        ServiceName: 'CaseClosed_g_ByUserGUIDService',
        BusinessData: {
          UserGuid,
          State: 0,
        },
      })
    },

    obtainIcons() {
      return requestBuilder
        .build(requestFormatter.format, {
          ServiceName: 'GlobalCacheSearchService',
          BusinessData: {
            UserGuid: ' ',
            State: 0,
          },
        })
        .then(request => client.post('/', request))
        .then(r => groupBy(r.data.ChannelIcons, i => i.ElementTypeId))
    },
  }
}
