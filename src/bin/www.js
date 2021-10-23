'use strict'

const app = require('../app')
const debug = require('debug')('epironApi:server')
const http = require('http')
const chalk = require('chalk')

const { port } = require('../config/api.config')

const normalizedPort = normalizePort(port)
app.set('port', normalizedPort)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(chalk.red(`[ERROR] ${bind} requires elevated privileges`))
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(chalk.red(`[ERROR] ${bind} is already in use`))
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

process.on('uncaughtException', (err) => {
  console.error(
    chalk.red(`[ERROR] Uncaught Exception ocurred ${err.message}`),
    err
  )
  throw err
})

process.on('unhandledRejection', (err) => {
  console.error(
    chalk.red(`[ERROR] Unhandled Rejection Ocurred ${err.message}`),
    err
  )
})
