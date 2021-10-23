'use strict'

module.exports = function EventsApi({
  eventsClient,
  requestFormatter,
  requestBuilder,
  user: {
    userId: UserId,
    userInfo: {
      ControlLoguin: AutomaticLogout,
      EventTimeReleaseList: ETDAutomaticReleaseTime,
    },
  },
}) {
  return {
    send(params) {
      return requestBuilder
        .build(requestFormatter.format, {
          ServiceName: 'EventLog_iService',
          BusinessData: {
            ...params,
            AutomaticLogout,
            ETDAutomaticReleaseTime,
            UserId,
          },
        })
        .then(request => eventsClient.post('/', request))
        .then(({ data }) => data)
    },
  }
}
