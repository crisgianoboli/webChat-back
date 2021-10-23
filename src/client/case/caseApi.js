'use strict'

module.exports = function CaseApi({
  client,
  requestFormatter,
  requestBuilder,
  caseUtils,
  clientManagment,
}) {
  function obtainCase({ caseId: CaseId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetCaseByCaseIdService',
        BusinessData: {
          CaseId,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => caseUtils.customizeCaseResponse(data))
  }

  function obtaintEnterCase({ caseId: CaseId, onPause: EventTypeIdOnPause }) {
    return clientManagment
      .post('/enterCase', { CaseId, EventTypeIdOnPause })
      .then(resp => resp.data)
  }

  function obtaintExitCase({
    caseId: CaseId,
    onPause: EventTypeIdOnPause,
    blockedGuid: BlockedGuid,
  }) {
    return clientManagment
      .post('/exitCase', { CaseId, EventTypeIdOnPause, BlockedGuid })
      .then(resp => resp.data)
  }
  return {
    obtainCase,
    obtaintEnterCase,
    obtaintExitCase,
  }
}
