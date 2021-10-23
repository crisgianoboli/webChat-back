'use strict'
const axios = require('axios')
const { login } = require('../../config/api.config')
const loginLogger = require('../../logs/clients/login.log')
const responseInterceptors = require('../interceptors/responseInterceptors')(
  loginLogger
)
const requestInterceptors = require('../interceptors/requestInterceptors')(
  loginLogger
)

module.exports = function loginClient() {
  const loginClient = axios.create({
    baseURL: login.host,
  })

  loginClient.interceptors.request.use(requestInterceptors.logRequest)
  loginClient.interceptors.request.use(requestInterceptors.addRequestData)
  loginClient.interceptors.request.use(requestInterceptors.buildMetadata)

  loginClient.interceptors.response.use(
    responseInterceptors.customizeLoginResponse
  )
  loginClient.interceptors.response.use(responseInterceptors.logResponse)
  loginClient.interceptors.response.use(responseInterceptors.handleError)
  
  return loginClient
}
