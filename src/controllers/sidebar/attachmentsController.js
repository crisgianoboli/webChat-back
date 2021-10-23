'use strict'

module.exports = function AttachmentsController({
  attachmentsProvider,
  controllerWrapper,
}) {
  function getAttachments(req, res, next) {
    const { conversationId } = req.params
    const params = {
      conversationId,
      fromRow: '0',
      orderAscendant: 'true',
      tagModuleEnable: 'true',
    }
    return controllerWrapper.async(
      params,
      attachmentsProvider.obtainAttachments,
      res,
      next
    )
  }

  return {
    getAttachments,
  }
}
