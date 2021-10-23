'use strict'

module.exports = function AttachmentsUtils() {
  function customizeAttachmentsResponse({ data: { Comments } }) {
    return Comments.map(e => ({
      CaseCommentId: e.CaseCommentId,
      CaseId: e.CaseId,
      ConversationId: e.ConversationId,
      CaseCommentAttachmentList: e.CaseCommentAttachmentList,
    }))
  }
  return { customizeAttachmentsResponse }
}
