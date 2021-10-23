'use strict'

module.exports = function RequestBuilder() {
  return {
    build(callback, params) {
      return new Promise((resolve, reject) => {
        const request = callback(params)
        resolve(request)
        if (!request) {
          reject(new Error(`Error building Request for ${params}`))
        }
      })
    },
  }
}
