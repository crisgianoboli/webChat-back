/* eslint-disable sonarjs/cognitive-complexity */
'use strict'

module.exports = function Config() {
  return {
    port: process.env.PORT || '3002',
    environment: process.env.ENVIRONMENT || 'development',
    epiron_url_base:
      process.env.EPIRON_URL_BASE ||
      'https://apiweb_dev.epiron.com.ar/api/disp/execute',
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
      profile_settings: {
        key: 'b34580fc7f150f96b1d0b2555c13b86167310579365e19105ca1d9ced3804401',
        iat: '6h',
        algorithm: 'HS512',
      },
    },
    managment: {
      host:
        process.env.EPIRON_MANAGMENT_URL ||
        'https://apiweb_dev.epiron.com.ar/api/managment',
    },
  }
}
