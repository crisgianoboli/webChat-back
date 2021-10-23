'use strict'

const { context } = require('../../config/api.config')

module.exports = function requestInterceptors(logger) {
  function addRequestData(config) {
    if (config.data && config.data.jsonRequest) {
      const configData = JSON.parse(config.data)
      return {
        ...config,
        serviceName: configData.serviceName,
        context: configData.jsonRequest.ContextInformation,
        businessData: configData.jsonRequest.BusinessData,
      }
    }
    return {
      ...config,
    }
  }

  function buildBody(config) {
    const customData = {
      serviceProviderName: context.service,
      ...config.data.serviceName,
      jsonRequest: {
        ...config.data.jsonRequest,
        SecurityProviderName: context.security,
        Encrypt: false,
        Error: null,
      },
    }
    Object.assign(config.data, customData)
    return config
  }

  function buildMetadata(config) {
    const meta = {
      ...(config.meta || {}),
      requestStartedAt: new Date().getTime(),
    }
    return { ...config, meta }
  }

  function logRequest(config) {
    const { serviceName, context, businessData, meta } = config
    logger.logRequest({
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      serviceName,
      context,
      businessData,
      startedTime: meta.requestStartedAt,
    })
    return config
  }

  return {
    buildBody,
    buildMetadata,
    logRequest,
    addRequestData,
  }
}
