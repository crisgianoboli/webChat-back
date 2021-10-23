'use strict'

module.exports = function ObservationsApi({
  clientManagment,
  client,
  requestFormatter,
  requestBuilder,
  observationsUtils,
  user: { userName },
}) {
  function getConfiguration({ AccountId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetAccountObservationDetailByAccountIdService',
        BusinessData: {
          AccountId,
          AODActiveFlag: 1,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => observationsUtils.customizeExtensionsAvailable(data))
  }

  function getObservationsApi({ caseId: CaseId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Observations_sService',
        BusinessData: {
          CaseId,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data: { Observations } }) => Observations)
      .then(data =>observationsUtils.customizeSearchObservationsResponse(data))
  }

  function getAttachmentsInObservations({ caseId: CaseId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetObservationsAttachmentByCaseIdService',
        BusinessData: { UserName: userName, CaseId },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
      .then(data =>
        observationsUtils.customizeAttachmentInObservationsResponse(data)
      )
  }

  function saveObservations(observation) {
    clientManagment
      .post('/observations/saveObservation', observation)
      .then(data => data)
  }

  function saveAttachmentsInObservations(attachments) {
    clientManagment
      .post('/observations/saveAttachment', attachments)
      .then(data => data)
  }
  
  function getBinaryFile({ ObservationsAttachmentId  }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetDataByObservationAttachmentIdService',
        BusinessData: { ObservationsAttachmentId },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
  }
  
  return {
    getBinaryFile,
    getConfiguration,
    getObservationsApi,
    getAttachmentsInObservations,
    saveObservations,
    saveAttachmentsInObservations,
  }
}
