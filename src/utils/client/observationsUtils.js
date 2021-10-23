'use strict'

module.exports = function ObservationsUtils() {
  
  function customizeExtensionsAvailable({ accountObservationDetailList }) {
    return accountObservationDetailList.map(
      ({ FileFormatExtension, FileSize }) => ({ FileFormatExtension, FileSize }))
  }

  function customizeSearchObservationsResponse(Observations) {
    return Observations.map(e => ({
      PersonFullName: e.PersonFullName,
      ObservationId: e.ObservationId,
      CaseId: e.CaseId,
      Description: e.Description,
      ObservationCreationDate: e.ObservationCreationDate,
      ModifiedByUserId: e.ModifiedByUserId,
      UserName: e.UserName,
      ModifiedDate: e.ModifiedDate,
      Crud: e.Crud,
      EntityState: e.EntityState,
    }))
  }

  function customizeAttachmentInObservationsResponse({
    listCaseFileAttachmentBE,
  }) {
    return listCaseFileAttachmentBE.map(e => ({
      MediaCategory: e.MediaCategory,
      ObservationsFileAttachmentId: e.ObservationsFileAttachmentId,
      CaseFileId: e.CaseFileId,
      CaseId: e.CaseId,
      ObservationsFileAttachmentName: e.ObservationsFileAttachmentName,
      ObservationsFileAttachment: e.ObservationsFileAttachment,
      ObservationsFileTransferEncoding: e.ObservationsFileTransferEncoding,
      ObservationsFileIsAttachmentOnBody: e.ObservationsFileIsAttachmentOnBody,
      ObservationsFileAttachmentOnBodyContent:
        e.ObservationsFileAttachmentOnBodyContent,
      ObservationsFileAttachmentCreated: e.ObservationsFileAttachmentCreated,
      MediaTypeId: e.MediaTypeId,
      ObservationsAttachmentModifiedByUser:
        e.ObservationsAttachmentModifiedByUser,
      MediaTypeName: e.MediaTypeName,
      CreationTimeElapsed: e.CreationTimeElapsed,
      AttachmentLenght: e.AttachmentLenght,
      ObservationsFileAttachmentLink: e.ObservationsFileAttachmentLink,
      TemplateJSON: e.TemplateJSON,
      IsNew: e.IsNew,
      UserName: e.UserName,
      EntityState: e.EntityState,
    }))
  }
  return {
    customizeExtensionsAvailable,
    customizeSearchObservationsResponse,
    customizeAttachmentInObservationsResponse,
  }
}
