'use strict'

module.exports = function CommentsUtils() {
  function setCommentParamenters({
    CommentText,
    CaseCommentPublicationTo,
    CaseCommentCreated,
    CaseId,
    //CaseModifiedDate, //amarillo
    //CaseQueueAssignmentEnd, //verde
    //CaseQueueAssignmentStart, //verde
    ConversationId,
    CaseCommentModifiedByUserId,
    //UserAssignedId,
    UCName,
    UCUserName,
    ClientId,
    UserName,
    UCPublicationTo,
    CaseCommentGUID,
    ProcessDetailsId,
    //UserId,
  }) {
    return {
      CommentText,
      PublicationTo: CaseCommentPublicationTo,
      CaseCreated: CaseCommentCreated,
      CaseId,
      CaseModifiedDate: new Date().toISOString(),
      CaseQueueAssignmentEnd: new Date().toISOString(),
      CaseQueueAssignmentStart: new Date().toISOString(),
      ConversationId,
      ModifiedByUserId: CaseCommentModifiedByUserId,
      UserAssignedId: 223,
      UCName,
      UCUserName,
      ClientId,
      ClientName: UserName,
      UCPublicationTo,
      FirstCommentGUID: CaseCommentGUID,
      ProcessDetailsId,
      UserId: 223,
      ElementTypeOutput: true,
    }
  }

  return {
    setCommentParamenters,
  }
}
