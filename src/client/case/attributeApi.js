'use strict'

module.exports = function AttributeApi({
  client,
  requestFormatter,
  requestBuilder,
}) {
  function getClientAttributeService({ AccountTypeId }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'GetClientAttributeService',
        BusinessData: {
          AccountTypeId,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
  }
  return {
    getClientAttributeService,
  }
}
