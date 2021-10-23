/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-vars */
'use strict'

module.exports = function ClientApi({ clientManagment, caseClientFormatter }) {
  function getAttributes({
    AccountTypeId,
    AccountId,
    UserChannelId,
    ClientId,
  }) {
    return clientManagment
      .post('/client/getAttributes', {
        AccountTypeId,
        AccountId,
        UserChannelId,
        ClientId,
      })
      .then(resp => resp.data)
  }

  async function getAllClientData({
    ClientId,
    AccountId,
    UserChannelId,
    AccountTypeId,
  }) {
    const obj = await getAttributes({
      AccountTypeId,
      AccountId,
      UserChannelId,
      ClientId,
    })

    return caseClientFormatter.replaceProperties(
      obj,
      caseClientFormatter.formatInformationGeneral,
      caseClientFormatter.addAtributteUniqueHash
    )
  }

  return {
    getAllClientData,
  }
}
