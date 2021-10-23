//FIXME Eliminar éste modulo y utilizar ./config.js
'use strict'
module.exports = {
  port: process.env.PORT || '3002',
  environment: process.env.ENVIRONMENT || 'development',
  epiron_url_base:
    process.env.EPIRON_URL_BASE ||
    'https://apiweb_dev.epiron.com.ar/api/disp/execute',
  managment_url:
    process.env.MANAGMENT_URL ||
    'https://apiweb_dev.epiron.com.ar/api/managment',
  logs: {
    common: {
      name: process.env.COMMON_LOG_NAME || 'common-transaction',
      level: process.env.COMMON_LOG_LEVEL || 'debug',
      path: process.env.COMMON_LOG_PATH || 'logs/',
      period: process.env.COMMON_LOG_PERIOD || '1d',
    },
    events: {
      name: process.env.COMMON_LOG_NAME || 'events-transactions',
      level: process.env.COMMON_LOG_LEVEL || 'debug',
      path: process.env.COMMON_LOG_PATH || 'logs/',
      period: process.env.COMMON_LOG_PERIOD || '1d',
    },
    login: {
      name: process.env.COMMON_LOG_NAME || 'login-transactions',
      level: process.env.COMMON_LOG_LEVEL || 'debug',
      path: process.env.COMMON_LOG_PATH || 'logs/',
      period: process.env.COMMON_LOG_PERIOD || '1d',
    },
    logout: {
      name: process.env.COMMON_LOG_NAME || 'logout-transactions',
      level: process.env.COMMON_LOG_LEVEL || 'debug',
      path: process.env.COMMON_LOG_PATH || 'logs/',
      period: process.env.COMMON_LOG_PERIOD || '1d',
    },
  },
  context: {
    service: process.env.SERVICE_PROVIDER_NAME || 'epiron',
    security: process.env.SECURITY_PROVIDER_NAME || 'epironWeb',
  },
  login: {
    instance:
      process.env.PROVIDER_INSTANCE || '75CFEFE4-5A79-E411-BD73-0022640637C2',
    host:
      process.env.EPIRON_LOGIN || 'https://apiweb_dev.epiron.com.ar/api/auth',
  },
}
