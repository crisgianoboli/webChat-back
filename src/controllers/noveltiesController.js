'use strict'

const fs = require('fs')

module.exports = function noveltiesController() {
  // eslint-disable-next-line no-unused-vars
  function novelties(req, res, next) {
    //const data = await noveltiesProvider.novelties()
    fs.readFile('./src/config/novelties.json', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  }
  return { novelties }
}
