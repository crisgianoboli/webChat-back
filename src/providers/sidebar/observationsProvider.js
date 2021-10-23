'use strict'

module.exports = function ObservationsProvider({
  observationsApi,
  observationsServices,
}) {
  
  function getConfiguration(params) {
    return observationsApi.getConfiguration(params)
  }

  async function obtainObservations(params) {
    
    const [observations, attachments] = await Promise.all([
      observationsApi.getObservationsApi(params),
      observationsApi.getAttachmentsInObservations(params),
    ])
    return observationsServices.observationsWithAttachments(
      observations,
      attachments
    )
  }

  function obtainSearchObservations(params) {
    return observationsApi.getObservationsApi(params)
  }

  function obtainAttachmentsInObservations(params) {
    return observationsApi.getAttachmentsInObservations(params)
  }

  function abmObservations(params) {
    return observationsApi.saveObservations(params)
  }

  function saveObservationsAttachments(params) {
    return observationsApi.saveAttachmentsInObservations(params)
  }
  
  function getBinaryFile(params){
    return observationsApi.getBinaryFile(params)
  }

  return {
    getBinaryFile,
    getConfiguration,
    obtainSearchObservations,
    obtainAttachmentsInObservations,
    obtainObservations,
    abmObservations,
    saveObservationsAttachments,
  }
}
