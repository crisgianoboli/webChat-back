'use strict'

module.exports = function ClientProvider({ caseClient }) {
  function getAllClientData(obj) {
    return caseClient.getAllClientData(obj)
  }

  return {
    getAllClientData,
  }
}
