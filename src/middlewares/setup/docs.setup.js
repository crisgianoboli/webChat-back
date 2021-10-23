'use strict'
const openapi = require('express-openapi')
const path = require('path')
const swaggerUi = require('swagger-ui-express')

module.exports = function setupDocs({ app, config: { port }, routes }) {
  openapi.initialize({
    apiDoc: require('../../config/docs.config.js'),
    app: routes,
    paths: path.resolve(__dirname, '../../routes/api-routes'),
  })
  app.use(
    '/api/api-docs-ui',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: `http://localhost:${port}/api/api-docs`,
      },
    })
  )
}
