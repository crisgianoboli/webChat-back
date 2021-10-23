'use strict'
const axios = require('axios')
const chalk = require('chalk')
const { epiron_url_base } = require('../../config/api.config')
const ServerError = require('../errors/ServerError')
const eventLogger = require('../../logs/clients/events.log')

module.exports = function eventsClient({ user: { authorization } }) {
  const client = axios.create({
    baseURL: epiron_url_base,
  })

  client.interceptors.request.use(
    function (config) {
      const customData = {
        serviceProviderName: 'epiron',
        ...config.data.serviceName,
        jsonRequest: {
          ...config.data.jsonRequest,
          SecurityProviderName: 'epironWeb',
          Encrypt: false,
          Error: null,
        },
      }

      const meta = {
        ...(config.meta || {}),
        requestStartedAt: new Date().getTime(),
      }

      Object.assign(config.data, customData)
      Object.assign(config.headers, {
        security_provider: 'epiron_sec',
        Authorization: `Bearer ${authorization}`,
      })

      eventLogger.logRequest({
        url: `${config.baseURL}${config.url}`,
        method: config.method,
        serviceName: config.data.ServiceName,
        context: config.data.jsonRequest.ContextInformation,
        businessData: config.data.jsonRequest.BusinessData,
        startedTime: meta.requestStartedAt,
      })

      return { ...config, meta }
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  client.interceptors.response.use(
    function (response) {
      const { data } = response

      const configDataJson = JSON.parse(response.config.data)
      eventLogger.logResponse({
        url: `${response.config.baseURL}${response.config.url}`,
        method: response.method,
        serviceName: configDataJson.serviceName,
        context: configDataJson.jsonRequest.ContextInformation,
        businessData: configDataJson.jsonRequest.BusinessData,
        responseTime:
          new Date().getTime() - response.config.meta.requestStartedAt,
        responseStatus: response.status,
        dataStatus: response.data.StatusCode,
        result: response.data.Result,
      })

      if (data && (data.Error || data.Result.Errors || data.Result.Error)) {
        return Promise.reject(
          new ServerError(
            `An error occurred on the server, response is ${data.Error} | ${
              data.Result.Errors
            } | ${JSON.stringify(data.Result.Error)}`,
            data
          )
        )
      }

      return {
        ...response,
        data: response.data.Result.BusinessData,
      }
    },
    function (err) {
      console.error(chalk.red(`[SERVER ERROR] Server error outside 2XX`))
      return Promise.reject(err)
    }
  )

  return client
}
