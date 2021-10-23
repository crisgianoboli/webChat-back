'use strict'

const axios = require('axios')
const { epiron_url_base } = require('../config/api.config')

const commonLogger = require('../logs/common.log')
const requestInterceptors = require('./interceptors/requestInterceptors')(
  commonLogger
)
const responseInterceptors = require('./interceptors/responseInterceptors')(
  commonLogger
)

module.exports = function Client({ user: { authorization } }) {
  const client = axios.create({
    baseURL: epiron_url_base,
  })

  client.interceptors.request.use(requestInterceptors.logRequest, err => {
    Promise.reject(err)
  })

  client.interceptors.request.use(
    function (config) {
      Object.assign(config.headers, {
        security_provider: 'epiron_sec',
        Authorization: `Bearer ${authorization}`,
      })
      return requestInterceptors.buildBody(config)
    },
    err => {
      Promise.reject(err)
    }
  )

  client.interceptors.request.use(requestInterceptors.buildMetadata, err => {
    Promise.reject(err)
  })

  client.interceptors.response.use(
    responseInterceptors.customizeResponse,
    err => Promise.reject(err)
  )

  client.interceptors.response.use(responseInterceptors.handleError, err =>
    Promise.reject(err)
  )

  client.interceptors.response.use(responseInterceptors.logResponse, err =>
    Promise.reject(err)
  )

  return client
}
