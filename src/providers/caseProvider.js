'use strict'

module.exports = function caseProvider({
  attachmentsProvider,
  conversationApi,
  caseApi,
  conversationCommentsApi,
  conversationUtils,
}) {
  async function getConversation(params) {
    const caseResult = await caseApi.obtainCase(params)
    return conversationApi.obtainConversation(caseResult)
  }

  async function conversationComments(params) {
    const result = await conversationCommentsApi.obtainConversationComments(
      params
    )
    return { Comments: conversationUtils.customizeCaseConversation(result) }
  }

  async function attachmentsByCase({ caseId, conversationId }) {
    const attachments = await attachmentsProvider.obtainAttachments({
      conversationId,
      fromRow: '0',
      orderAscendant: 'true',
      tagModuleEnable: 'true',
    })
    return attachments.filter(a => a.CaseId === Number(caseId))
  }
  function managmentEnterCase({ caseId, onPause }) {
    return caseApi.obtaintEnterCase({ caseId, onPause })
  }
  function managmentExitCase({ caseId, onPause, blockedGuid }) {
    return caseApi.obtaintExitCase({ caseId, onPause, blockedGuid })
  }

  return {
    getConversation,
    conversationComments,
    attachmentsByCase,
    managmentEnterCase,
    managmentExitCase,
  }
}
