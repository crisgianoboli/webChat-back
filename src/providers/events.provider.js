'use strict'

module.exports = function EventsProvider({ eventsApi, auxiliariesApi }) {
  return {
    async register(params) {
      const { EventTypeManageCase } = params
      /* TODO for the future
      Bloqueante
        Se identifican mediante el campo 
        Event_sTimeBarResponse.EventTypeManageCase = 0. 

      No Bloqueantes
        Se identifican mediante el campo 
        Event_sTimeBarResponse.EventTypeManageCase = 1
        No asigna casos Event_sTimeBarResponse.EventTypingInternalCode = null o 1. 
        Frena la asignación de casos de chat Event_sTimeBarResponse.EventTypingInternalCode = 2.
      */
      if (EventTypeManageCase) {
        return eventsApi.send({
          ...params,
          OnPause: 0,
        })
      } else {
        //TODO hardcoded, check document information with the client
        const { EventTypeId } = await auxiliariesApi.obtainCurrentEvent({
          isNull: false,
          excludePauses: true,
        })
        return eventsApi.send({
          ...params,
          EventTypeId,
          OnPause: 1,
          EventTypeIdOnPause: params.EventTypeId,
        })
      }
    },
  }
}
