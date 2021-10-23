'use strict'

module.exports = function ClientUtils() {
  function customizeClientInformationResponse({
    ClientId,
    Value,
    ClientAttributeItemId,
    ClientAttributeId,
  }) {
    return {
      ClientId,
      Value,
      AttributeId: ClientAttributeId,
      AttributeItemId: ClientAttributeItemId,
    }
  }
  //TODO repasar este archivo
  const groupArrayOfObjects = (list, key) =>
    list.reduce(function (rv, x) {
      const ar = rv
      ;(ar[x[key]] = ar[x[key]] || []).push(x)
      return ar
    }, {})

  function customizeClientAttributResponse(data) {
    return groupArrayOfObjects(data, 'ClientAttributeGroupId')
  }

  function mergeCommentsArrays(data1, data2) {
    const result = []
    let name
    for (const key1 in data1) {
      name = data1[key1].ClientFirstName
      for (const key2 in data2) {
        if (data2[key2].ClientAttributeId === data1[key1].ClientAttributeId) {
          result.push({
            ...customizeClientInformationResponse(data1[key1]),
            ...data2[key2],
          })
        }
      }
    }
    return {
      name,
      attributes: customizeClientAttributResponse(result),
    }
  }

  return {
    mergeCommentsArrays,
  }
}
