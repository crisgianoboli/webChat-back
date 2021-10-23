'use strict'

module.exports = function AttachmentsApi({
  client,
  requestFormatter,
  requestBuilder,
  attachmentsUtils,
}) {
  function getAttachmentService({
    conversationId: ConversationId,
    fromRow,
    orderAscendant,
    tagModuleEnable,
  }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Conversation_sHasAttachment_CommentsService',
        BusinessData: {
          ConversationId,
          FromRow: fromRow,
          OrderAscendant: orderAscendant,
          TagModuleEnable: tagModuleEnable,
        },
      })
      .then(request => client.post('/', request))
      .then(attachmentsUtils.customizeAttachmentsResponse)
  }
  return { getAttachmentService }
}
