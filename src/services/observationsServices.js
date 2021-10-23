'use strict'

const { concat } = require('lodash')

module.exports = function ObservationsServices() {
  function observationsWithAttachments(observations, attachments) {
    const obsTypeAttachments = attachments.map(
      ({ UserName, CaseFileId, ObservationsFileAttachmentCreated, ...e }) => ({
        ...e,
        PersonFullName: UserName,
        CaseId: CaseFileId,
        ObservationCreationDate: ObservationsFileAttachmentCreated,
      })
    )
    return concat(observations, obsTypeAttachments).sort(function (a, b) {
      return a.ObservationCreationDate - b.ObservationCreationDate
    })
  }
  return {
    observationsWithAttachments,
  }
}
