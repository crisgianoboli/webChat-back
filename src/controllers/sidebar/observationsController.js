'use strict'

module.exports = function ObservationsController({
  observationsProvider,
  controllerWrapper,
}) {
  
  function getBinaryFile(req, res, next){
    const { observationsFileAttachmentId: ObservationsAttachmentId } = req.params
    return controllerWrapper.async(
      {
        ObservationsAttachmentId,
      },
      observationsProvider.getBinaryFile,
      res,
      next
    )
  }
  
  function getConfiguration(req, res, next){
    const { accountId: AccountId } = req.params
    return controllerWrapper.async(
      {
      AccountId,
      },
      observationsProvider.getConfiguration,
      res,
      next
    )
  }
  
  function getObservations(req, res, next) {

    const { caseId, conversationId } = req.params
    return controllerWrapper.async(
      {
        caseId,
        conversationId,
      },
      observationsProvider.obtainObservations,
      res,
      next
    )
  }

  function searchObservations(req, res, next) {
    const { caseId, conversationId } = req.params
    return controllerWrapper.async(
      {
        caseId,
        conversationId,
      },
      observationsProvider.obtainSearchObservations,
      res,
      next
    )
  }

  function searchAttacmentsInObservations(req, res, next) {
    const { caseId, conversationId } = req.params
    return controllerWrapper.async(
      {
        caseId,
        conversationId,
      },
      observationsProvider.obtainAttachmentsInObservations,
      res,
      next
    )
  }

  function editObservations(req, res, next) {
    const { caseId: CaseId } = req.params

    return controllerWrapper.async(
      {
        data: { ...req.body, CaseId },
        crud: 2,
      },
      observationsProvider.abmObservations,
      res,
      next
    )
  }
  
  function newObservations(req, res, next) {
    
    const { caseId: CaseId } = req.params
    const { descripcion: Description } = req.body
    return controllerWrapper.async(
      {
        Description,
        CaseId,
        Crud: 1,
      },
      observationsProvider.abmObservations,
      res,
      next
    )
  }
  
  function saveAttachmentsInObservations(req, res, next) {
    const { caseId: CaseId, accountId: AccountId } = req.params
    const { fileName: FileName, fileBase64: FileBase64 } = req.body
  
    return controllerWrapper.async(
      {
        FileName,
        CaseId,
        FileBase64,
        AccountId,
      },
      observationsProvider.saveObservationsAttachments,
      res,
      next
    )
  }
  return {
    getBinaryFile,
    getConfiguration,
    getObservations,
    searchAttacmentsInObservations,
    newObservations,
    editObservations,
    searchObservations,
    saveAttachmentsInObservations,
  }
}
