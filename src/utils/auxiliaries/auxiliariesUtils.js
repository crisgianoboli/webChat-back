'use strict'

module.exports = function auxiliariesUtils() {
  return {
    customizeAuxiliariesResponse(data) {
      return data.map(
        ({
          EventTypeId,
          EventTypeInternalCode,
          EventTypeManageCase,
          EventTypeName,
          EventTypingInternalCode,
        }) => ({
          EventTypeId,
          EventTypeInternalCode,
          EventTypeManageCase,
          EventTypeName,
          EventTypingInternalCode,
        })
      )
    },

    customizeObtainEventResponse({
      EventLogId,
      EventTypeId,
      EventTypeInternalCode,
      EventTypeManageCase,
      EventTypeName,
      EventTypeTimeBar,
    }) {
      return {
        EventLogId,
        EventTypeId,
        EventTypeInternalCode,
        EventTypeManageCase,
        EventTypeName,
        EventTypeTimeBar,
      }
    },
  }
}
