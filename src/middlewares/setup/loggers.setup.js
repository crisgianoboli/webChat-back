'use strict'
const bunyanLogger = require('../../logs/common.log')
const logger = require('morgan')

module.exports = function setupLogger() {
  function setupBunyanRequest(req, res, next) {
    const log = bunyanLogger.loggerInstance.child(
      {
        id: req.id,
        body: req.body,
      },
      true
    )
    log.info({
      req,
    })
    next()
  }

  function setupBunyanResponse(req, res, next) {
    function afterResponse() {
      res.removeListener('finish', afterResponse)
      res.removeListener('close', afterResponse)
      const log = bunyanLogger.loggerInstance.child(
        {
          id: req.id,
        },
        true
      )
      log.info({ res }, 'response')
    }

    res.on('finish', afterResponse)
    res.on('close', afterResponse)
    next()
  }

  return {
    setupBunyanRequest,
    setupBunyanResponse,
    setupMorgan: logger('dev'),
  }
}
