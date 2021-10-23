'use strict'

const { ClientError } = require('../../errors/ClientError')

module.exports = function responseInterceptors(logger) {
  function obtainRequestData(config) {
    try {
      const data = JSON.parse(config.data)
      return {
        serviceName: data.ServiceName || '',
        context: data.jsonRequest.ContextInformation || '',
        businessData: data.jsonRequest.BusinessData || '',
      }
    } catch (error) {
      return {
        serviceName: '',
        context: '',
        businessData: '',
      }
    }
  }

  function logResponse(response) {
    try {
      const { serviceName, context, businessData } = obtainRequestData(
        response.config
      )
      logger.logResponse({
        url: `${response.config.baseURL}${response.config.url}`,
        method: response.method,
        serviceName,
        context,
        businessData,
        responseTime:
          new Date().getTime() - response.config.meta.requestStartedAt,
        responseStatus: response.status,
        dataStatus: response.StatusCode,
        result: response.data.Result,
      })
    } catch (err) {
      console.error(err, 'oqiwueoiqwue')
    }
    return response
  }

  function customizeLoginResponse(response) {
    return {
      ...response,
      data: response.data.Result,
      responseError: response.data.Error,
      StatusCode: response.data.StatusCode,
    }
  }

  function customizeLogoutResponse(response) {
    return response.status === 200
      ? {
          ...response,
          data: response.data,
          responseError: response.data.Error,
          StatusCode: response.data.StatusCode,
        }
      : response
  }

  function customizeResponse(response) {
    return {
      ...response,
      data: response.data.Result.BusinessData,
      responseError: response.data.Error,
      StatusCode: response.data.StatusCode,
    }
  }

  function handleError(response) {
    if (response.status === 204) {
      return response
    }

    const { StatusCode, data, responseError } = response
    if (StatusCode === 200 && data && data.Error) {
      return Promise.reject(
        new ClientError(
          data.Error.message,
          data.Error.internalCode,
          data.Error.type
        )
      )
    }

    if (StatusCode !== 200) {
      return Promise.reject(
        new ClientError(
          responseError.message,
          responseError.internalCode,
          responseError.type
        )
      )
    }

    return response
  }

  return {
    logResponse,
    customizeLoginResponse,
    customizeLogoutResponse,
    customizeResponse,
    handleError,
  }
}
