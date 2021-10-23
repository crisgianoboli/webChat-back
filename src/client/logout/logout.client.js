'use strict'
const axios = require('axios')
const { login } = require('../../config/api.config')
const logoutLogger = require('../../logs/clients/logout.log')
const responseInterceptors = require('../interceptors/responseInterceptors')(
  logoutLogger
)
const requestInterceptors = require('../interceptors/requestInterceptors')(
  logoutLogger
)

module.exports = function logoutClient({ user: { authorization } }) {
  const logoutClient = axios.create({
    baseURL: login.host,
  })

  logoutClient.interceptors.request.use(requestInterceptors.logRequest)
  logoutClient.interceptors.request.use(function (config) {
    Object.assign(config.headers, {
      security_provider: 'epiron_sec',
      Authorization: `Bearer ${authorization}`,
    })
    return requestInterceptors.buildBody(config)
  })

  logoutClient.interceptors.request.use(requestInterceptors.addRequestData)
  logoutClient.interceptors.request.use(requestInterceptors.buildMetadata)

  logoutClient.interceptors.response.use(
    responseInterceptors.customizeLogoutResponse
  )
  logoutClient.interceptors.response.use(responseInterceptors.logResponse)
  logoutClient.interceptors.response.use(
    responseInterceptors.handleError,
    err => Promise.reject(err)
  )

  return logoutClient
}
