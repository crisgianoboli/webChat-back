'use strict'
const bunyan = require('bunyan')
const {
  logs: { common },
} = require('../config/api.config')

exports.loggerInstance = bunyan.createLogger({
  name: common.name,
  serializers: {
    req: require('bunyan-express-serializer'),
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  level: common.level,
  streams: [
    {
      path: `${
        common.path
      }log_${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}.log`,
      period: common.period,
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
  try {
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
  } catch (err) {
    console.error(err)
  }
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
