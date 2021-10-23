'use strict'

module.exports = function CaseController({
  controllerWrapper,
  caseProvider,
  clientProvider,
  notificationProvider,
  commentsProvider,
}) {
  function getConversation(req, res, next) {
    const { caseId } = req.params
    /*const response = await providerGetConversation({
      caseId,
      userGUID,
      userName,
    })*/

    return controllerWrapper.async(
      {
        caseId,
      },
      caseProvider.getConversation,
      res,
      next
    )
  }

  function getClientController(req, res, next) {
    const { caseId } = req.params
    return controllerWrapper.async(
      {
        caseId,
      },
      clientProvider.obtainClient,
      res,
      next
    )
  }

  function getNotificationsController(req, res, next) {
    const { caseId } = req.params
    return controllerWrapper.async(
      {
        caseId,
      },
      notificationProvider.obtainNotifications,
      res,
      next
    )
  }

  function getConversationCommentsController(req, res, next) {
    const { conversationId } = req.params
    return controllerWrapper.async(
      {
        conversationId,
      },
      caseProvider.conversationComments,
      res,
      next
    )
  }

  function sendCommentsController(req, res, next) {
    const { conversationId } = req.params
    return controllerWrapper.async(
      {
        conversationId,
      },
      commentsProvider.sendComments,
      res,
      next
    )
  }
  function getAttachmentsByCaseController(req, res, next) {
    const { caseId, conversationId } = req.params
    return controllerWrapper.async(
      {
        caseId,
        conversationId,
      },
      caseProvider.attachmentsByCase,
      res,
      next
    )
  }
  function getManagmentCaseEnterController(req, res, next) {
    const { caseId } = req.params
    const { onPause } = req.query

    return controllerWrapper.async(
      { caseId, onPause },
      caseProvider.managmentEnterCase,
      res,
      next
    )
  }
  function getManagmentCaseExitController(req, res, next) {
    
    const { caseId } = req.params
    const { blockedGuid, onPause } = req.body

    return controllerWrapper.async(
      { caseId, onPause, blockedGuid },
      caseProvider.managmentExitCase,
      res,
      next
    )
  }
  return {
    getConversation,
    getClientController,
    getNotificationsController,
    getConversationCommentsController,
    sendCommentsController,
    getAttachmentsByCaseController,
    getManagmentCaseEnterController,
    getManagmentCaseExitController,
  }
}
