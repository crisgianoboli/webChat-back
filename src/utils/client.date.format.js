'use strict'

function stringToArray(date) {
  return date.split(' ').map(s => {
    const aux = parseInt(s)
    if (Number.isInteger(aux)) {
      return aux
    } else {
      return s.toLowerCase()
    }
  })
}

function arrayToDate(array) {
  const valueDate = {
    días: 86400000,
    horas: 3600000,
    minutos: 60000,
  }
  for (const property in valueDate) {
    const i = array.indexOf(property)
    if (i !== -1) {
      valueDate[property] *= array[i - 1]
    } else {
      valueDate[property] = 0
    }
  }
  const date1 = new Date()
  return new Date(
    date1.setTime(
      date1.getTime() -
        (valueDate['días'] + valueDate['horas'] + valueDate['minutos'])
    )
  )
}

function stringToDate(date) {
  const array = stringToArray(date)
  return arrayToDate(array)
}

module.exports = {
  stringToDate,
  stringToArray,
  arrayToDate,
}
