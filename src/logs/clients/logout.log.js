'use strict'
const bunyan = require('bunyan')
const {
  logs: { logout },
} = require('../../config/api.config')

exports.loggerInstance = bunyan.createLogger({
  name: logout.name,
  serializers: {
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  level: logout.level,
  streams: [
    {
      path: `${
        logout.path
      }logout${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}.log`,
      period: logout.period,
    },
    {
      stream: process.stdout,
    },
  ],
})

exports.logResponse = function ({
  url,
  method,
  serviceName,
  context,
  businessData,
  responseTime,
  responseStatus,
  dataStatus,
  result,
}) {
  const log = this.loggerInstance.child(
    {
      url,
      method,
      serviceName,
      context,
      businessData,
      responseTime,
      responseStatus,
      dataStatus,
      result,
    },
    true
  )
  log.info('response')
}

exports.logRequest = function ({
  url,
  method,
  serviceName,
  context,
  businessData,
  startedTime,
}) {
  const log = this.loggerInstance.child(
    {
      url,
      method,
      serviceName,
      context,
      businessData,
      startedTime,
    },
    true
  )
  log.info('request')
}
