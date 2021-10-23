'use strict'

module.exports = function NotificationApi({
  client,
  requestFormatter,
  requestBuilder,
  user: { userId: UserId },
}) {
  function findNotifications({ caseId: CaseId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'SearchNotificationByUserIdService',
        BusinessData: {
          CaseId,
          UserId,
        },
      })
      .then(request => client.post('/', request))
      .then(r => r.data)
  }

  return {
    findNotifications,
  }
}
