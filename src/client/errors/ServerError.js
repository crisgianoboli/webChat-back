'use strict'

class ServerError extends Error {
  constructor(message, response) {
    super(message)
    this.response = response
  }
}

module.exports = ServerError
