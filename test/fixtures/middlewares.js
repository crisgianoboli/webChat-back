'use strict'

const sinon = require('sinon')

module.exports = function MiddleWares() {
  function getRes() {
    return {
      status: sinon.stub().returnsThis(),
      send(response) {
        return response
      },
    }
  }
  return { getRes }
}
