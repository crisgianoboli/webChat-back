'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const addRequestId = require('express-request-id')()
const { handleError } = require('./errors/error.handler')
const { MiddlewareError } = require('./errors/MiddlewareError')

const app = express()
const {
  setupDocs,
  setupBunyanRequest,
  setupBunyanResponse,
  setupMorgan,
  setupInversionOfControl,
} = require('./middlewares/setup/')
const config = require('./config/api.config')

app.use(setupBunyanRequest)
app.use(setupBunyanResponse)
app.use(setupMorgan)

setupInversionOfControl({ app })

app.set('trust proxy', true)
app.use(addRequestId)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(routes)
setupDocs({ app, config, routes })

app.all('*', (req, res, next) => {
  const err = new MiddlewareError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  )
  next(err)
})

app.use(handleError)

module.exports = app
