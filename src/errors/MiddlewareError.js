'use strict'

module.exports = {
  MiddlewareError: class MiddlewareError extends Error {
    constructor(message, errorCode) {
      super(message)
      this.errorCode = errorCode
      Error.captureStackTrace(this, this.constructor)
    }
  },
}
