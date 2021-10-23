'use strict'

const { makeInvoker } = require('awilix-express')
const noveltiesController = require('../../../controllers/noveltiesController')

module.exports = function () {
  const api = makeInvoker(noveltiesController)

  return {
    GET: [api('novelties')],
  }
}
