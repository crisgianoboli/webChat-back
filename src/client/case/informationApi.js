'use strict'

module.exports = function InformationApi({
  client,
  requestFormatter,
  requestBuilder,
}) {
  function getClientService({ ClientId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetClientService',
        BusinessData: {
          ClientId,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
  }
  return {
    getClientService,
  }
}
