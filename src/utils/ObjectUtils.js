'use strict'

module.exports = function ObjectUtils() {
  return {
    getObject(object, property, subProperty, value) {
      return object[property].find(e => e[subProperty] === value)
    },
  }
}
