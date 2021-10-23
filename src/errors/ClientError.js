'use strict'

module.exports = {
  ClientError: class ClientError extends Error {
    constructor(message, internalCode, type) {
      super(message)
      this.internalCode = internalCode
      this.type = type
      Error.captureStackTrace(this, this.constructor)
    }
  },
}
