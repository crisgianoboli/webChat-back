'use strict'
const chalk = require('chalk')

const handleError = (err, req, res, next) => {
  
  const { StatusCode, Error: { message, internalCode }} = err.response.data

  console.error(
    chalk.red(
      `[ERROR] Code: ${
        StatusCode || internalCode
      } | Message: ${message} || Stack: ${err.stack}`
    )
  )

  return res.status(StatusCode || err.status || 500).json({
    referenError: err.name,
    errorCode: StatusCode || internalCode,
    message: message || err.errors[0].message,
  })
}

module.exports = {
  handleError,
}
