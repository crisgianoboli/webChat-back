'use strict'

module.exports = function caseProvider({ auxiliariesApi }) {
  return {
    obtainAuxiliaries(data) {
      return auxiliariesApi.obtainAuxiliaries(data)
    },

    obtainCurrentEvent(data) {
      return auxiliariesApi.obtainCurrentEvent(data)
    },
  }
}
