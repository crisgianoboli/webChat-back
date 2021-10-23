'use strict'

module.exports = function AttachmentsProvider({ attachmentsApi }) {
  function obtainAttachments(params) {
    return attachmentsApi.getAttachmentService(params)
  }
  return { obtainAttachments }
}
