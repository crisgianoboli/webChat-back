'use strict'

module.exports = function ConversationLastCommentInformationApi({
  client,
  requestFormatter,
  requestBuilder,
}) {
  function obtainLastCommentInformation({ CaseId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'CaseComment_s_LastCommentByUserService',
        BusinessData: {
          CaseId,
          //TODO hardcoded
          ElementTypeOutput: false,
          ElementTypePublic: true,
          SCInternalCode: 3,
          AccountDetails: '2',
        },
      })
      .then(request => client.post('/', request))
      .then(r => r.data)
  }

  return {
    obtainLastCommentInformation,
  }
}
