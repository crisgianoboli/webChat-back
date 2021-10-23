'use strict'

module.exports = function CommentsProvider({
  commentsUtils,
  conversationLastCommentInformationApi,
  commentsApi,
}) {
  async function sendComments(opts, commentsParameters) {
    const { CaseId } = commentsUtils.setCommentParamenters(commentsParameters)
    const lastCommentInformation = await conversationLastCommentInformationApi.obtainLastCommentInformation(
      {
        ...opts,
        CaseId,
      }
    )
    return commentsApi.sendComments(
      opts,
      commentsParameters,
      lastCommentInformation[0]
    )
  }

  return {
    sendComments,
  }
}
