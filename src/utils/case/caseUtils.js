'use strict'

module.exports = function CaseUtils() {
  function customizeCaseResponse({
    AccountId,
    CaseId,
    ConversationId,
    GroupAccountId,
    UserChannelId,
    UCUserName,
    ClientName,
    ClientId,
    AccountTypeId,
  }) {
    return {
      AccountId,
      AccountTypeId,
      CaseId,
      ConversationId,
      GroupAccountId,
      UserChannelId,
      UCUserName,
      ClientName,
      ClientId,
    }
  }
  return { customizeCaseResponse }
}
