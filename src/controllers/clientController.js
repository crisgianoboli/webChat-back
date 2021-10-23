'use strict'

module.exports = function ClientController({
  controllerWrapper,
  clientProvider,
}) {
  function clientAllRoutes(req, res, next) {
    
    const {
      accountId: AccountId,
      userChannelId: UserChannelId,
      accountTypeId: AccountTypeId,
      clientId: ClientId,
    } = req.body

    return controllerWrapper.async(
      {
        ClientId,
        AccountId,
        UserChannelId,
        AccountTypeId,
      },
      clientProvider.getAllClientData,
      res,
      next
    )
  }

  return {
    clientAllRoutes,
  }
}
