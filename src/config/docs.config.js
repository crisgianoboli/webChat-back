'use strict'

module.exports = {
  openapi: '3.0.0',
  servers: [
    {
      url: '/api',
      description: 'development server',
    },
  ],
  info: {
    title: 'Epiron OpenApi',
    version: '3.0.0',
  },

  components: {
    securitySchemes: {
      bearearAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // definitions: {},
  paths: {},
  security: [
    {
      bearearAuth: [],
    },
  ],
}
