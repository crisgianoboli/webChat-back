'use strict'

module.exports = function NotificationsProvider({ notificationApi }) {
  function obtainNotifications(params) {
    return notificationApi.findNotifications(params)
  }

  return {
    obtainNotifications,
  }
}
