'use strict'

module.exports = function TagsFormatter() {
  return {
    formatTagsForCreatePermits({ data, AllowUserToCreateTags }) {
      let dataFilter = []
      dataFilter =
        parseInt(AllowUserToCreateTags) === 0
          ? data.filter(item => item.TagTypeInternalCode !== 1, 0)
          : data
      return dataFilter
    },
  }
}
