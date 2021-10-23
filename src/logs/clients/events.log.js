'use strict'
const bunyan = require('bunyan')
const {
  logs: { events },
} = require('../../config/api.config')

exports.loggerInstance = bunyan.createLogger({
  name: events.name,
  serializers: {
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  level: events.level,
  streams: [
    {
      path: `${
        events.path
      }events${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}.log`,
      period: events.period,
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
