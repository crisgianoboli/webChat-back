'use strict'

module.exports = function auxiliariesApi({
  client,
  requestFormatter,
  requestBuilder,
  auxiliariesUtils,
  user: {
    userInfo: { AccountAssigned },
    userId: UserId,
  },
}) {
  return {
    obtainAuxiliaries() {
      return requestBuilder
        .build(requestFormatter.format, {
          ServiceName: 'Event_sTimeBarService',
          BusinessData: {
            AccountId: AccountAssigned[0].AccountId,
          },
        })
        .then(request => client.post('/', request))
        .then(({ data }) => auxiliariesUtils.customizeAuxiliariesResponse(data))
    },

    obtainCurrentEvent({ isNull: IsNull, excludePauses: ExcludePauses }) {
      return requestBuilder
        .build(requestFormatter.format, {
          ServiceName: 'EventLog_sByUserService',
          BusinessData: {
            UserId,
            IsNull,
            ExcludePauses,
          },
        })
        .then(request => client.post('/', request))
        .then(({ data }) => auxiliariesUtils.customizeObtainEventResponse(data))
    },
  }
}
