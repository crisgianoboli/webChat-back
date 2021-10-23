'use strict'

module.exports = function ConversationApi({
  client,
  requestFormatter,
  requestBuilder,
  conversationUtils,
}) {
  function obtainConversation(caseResult) {
    const { UserChannelId, AccountId, ConversationId } = caseResult
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'ConversationsUserByConversationIdService',
        BusinessData: {
          UserChannelId,
          AccountId,
          ConversationId,
          //TODO harcoded values - get TagModuleEnable from groupAccount
          FromRow: 0,
          OrderAscendant: true,
          TagModuleEnable: true,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) =>
        conversationUtils.customizeConversation(caseResult, data)
      )
  }

  return {
    obtainConversation,
  }
}
