'use strict'

const axios = require('axios')
const { managment_url } = require('../config/api.config')

const commonLogger = require('../logs/common.log')
const requestInterceptors = require('./interceptors/requestInterceptors')(
  commonLogger
)
const responseInterceptors = require('./interceptors/responseInterceptors')(
  commonLogger
)

module.exports = function ClientManagment({ user: { authorization } }) {
  const client = axios.create({
    baseURL: managment_url,
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
      return config
    },
    err => {
      Promise.reject(err)
    }
  )

  client.interceptors.request.use(requestInterceptors.buildMetadata, err => {
    Promise.reject(err)
  })

  client.interceptors.response.use(
    responseInterceptors.customizeLoginResponse,
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
