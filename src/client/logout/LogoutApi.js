'use strict'

module.exports = function LogoutApi({ logoutClient }) {
  return {
    logout({
      userId: UserId,
      onPause: OnPause,
      additionalInformation: AdditionalInformation,
      automaticLogout: AutomaticLogout,
      authorization,
    }) {
      return logoutClient
        .post(
          '/logout',
          {
            UserId,
            OnPause,
            //TODO Información que contiene IP de la estación, fecha del sistema, versión de la aplicación.
            AdditionalInformation,
            AutomaticLogout,
          },
          {
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          }
        )
        .then(({ data }) => data)
    },
  }
}
