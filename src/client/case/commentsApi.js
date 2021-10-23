'use strict'

const { requestedParameters } = require('../../mocks/comment.mock')

module.exports = function CommentsApi({
  client,
  requestFormatter,
  requestBuilder,
}) {
  function buildSendCommentsRequest({
    commentParameters: {
      CommentText,
      //PublicationTo,
      //CaseCreated,
      //CaseId,
      //CaseModifiedDate,
      //--> Verde
      //CaseQueueAssignmentEnd,
      // --> Verde
      // CaseQueueAssignmentStart,
      //ConversationId,
      //--> Verde
      //ModifiedByUserId,
      //UserAssignedId,
      UCName,
      UCUserName,
      //ClientId,
      //ClientName,
      //UCPublicationTo,
      // FirstCommentGUID,
      //--> Verde
      //ProcessDetailsId,
      //UserId,
    },
    requestedParameters: { Comment, Case },
    lastCommentInformation: { CaseCommentPublicationTo },
  }) {
    const ServiceName = 'InsertCommentService'
    const BusinessData = {
      Comment: {
        // PublicationTo,
        //CaseCreated,
        //CaseId,
        //CaseModifiedDate,
        //CaseQueueAssignmentEnd,
        //CaseQueueAssignmentStart,
        //ConversationId,
        //ModifiedByUserId,
        //ProcessDetailsId,
        //UserAssignedId,
        ...Comment,
        PublicationTo: CaseCommentPublicationTo,
        CommentText,
      },
      Case: {
        ...Case,
        UCName,
        UCUserName,
        //ClientId,
        //ClientName,
        UCPublicationTo: CaseCommentPublicationTo,
        //FirstCommentGUID,
        //CaseCreated,
        //CaseId,
        // CaseModifiedDate,
        // CaseQueueAssignmentEnd,
        // CaseQueueAssignmentStart,
        // ConversationId,
        //ProcessDetailsId,
        //UserAssignedId,
        // UserId,
      },
    }
    return requestFormatter.format(ServiceName, BusinessData)
  }

  function sendComments(opts, commentParameters, lastCommentInformation) {
    return requestBuilder
      .build(buildSendCommentsRequest, {
        ...opts,
        lastCommentInformation,
        commentParameters,
        requestedParameters,
      })
      .then(request => client.post('/', request))
      .then(res => res.data)
  }

  return {
    sendComments,
  }
}
