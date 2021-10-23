'use strict'

const client = require('../client')

const { formatOptions } = require('../../utils/request.utils')
const { buildRequest } = require('../../utils/builder')

function customizeGroupAccountResponse(object) {
  return {
    TagModuleEnable: object.TagModuleEnable,
  }
}

function obtainGroupAccount({ userGUID, userName, GroupAccountId }) {
  return buildRequest(formatOptions, {
    ServiceName: 'GetGroupAccountByGroupAccountService',
    BusinessData: {
      GroupAccountId,
    },
    ContextInformation: {
      UserGuid: userGUID,
      userName,
    },
  })
    .then(request => client.post('/', request))
    .then(r => customizeGroupAccountResponse(r.data))
}

module.exports = {
  obtainGroupAccount,
}
