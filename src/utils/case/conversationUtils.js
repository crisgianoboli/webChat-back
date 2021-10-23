'use strict'

function customizeTags(tags) {
  return tags.length !== 0
    ? tags.sort((a, b) => a.ShowPriotiry - b.ShowPriotiry)
    : []
}

module.exports = function ConversationUtils() {
  return {
    customizeConversation(
      { UCUserName, ClientName, ConversationId: caseConversationId },
      { Conversations, Comments }
    ) {
      const data = Conversations.map(conversation => ({
        ...conversation,
        Comments: Comments.filter(
          comment => comment.ConversationId === conversation.ConversationId
        ),
      }))
      return {
        UCUserName,
        ClientName,
        caseConversationId,
        data,
      }
    },
    customizeCaseConversation({ Comments }) {
      return Comments.map(c => ({
        ...c,
        Tags: customizeTags(c.Tags),
      }))
    },
  }
}
