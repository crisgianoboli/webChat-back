'use strict'
//FIXME a eliminar cuando se migre a DI 
function buildRequest(callback, params) {
  return new Promise((resolve, reject) => {
    const request = callback(params)
    resolve(request)
    if (!request) {
      reject(new Error(`Error building Request for ${params}`))
    }
  })
}

module.exports = {
  buildRequest,
}
