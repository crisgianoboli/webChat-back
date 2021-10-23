'use strict'

module.exports = function ConversationCommentsApi({
  client,
  requestFormatter,
  requestBuilder,
}) {
  function obtainConversationComments({ conversationId: ConversationId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Conversation_s_CommentsService',
        BusinessData: {
          ConversationId,
          GetOldestCommentDateInDays: true,
          OrderAscendant: false,
          TagModuleEnable: true,
          FromRow: 0,
        },
      })
      .then(request => client.post('/', request))
      .then(r => r.data)
  }

  return {
    obtainConversationComments,
  }
}
