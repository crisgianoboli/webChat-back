'use strict'
const setupDocs = require('./docs.setup')
const {
  setupBunyanRequest,
  setupBunyanResponse,
  setupMorgan,
} = require('./loggers.setup.js')()
const setupInversionOfControl = require('./inversion.setup')

module.exports = {
  setupDocs,
  setupBunyanRequest,
  setupBunyanResponse,
  setupMorgan,
  setupInversionOfControl,
}
