'use strict'

module.exports = function TagsProvider({ tagsApi }) {
  function getTags(params) {
    return tagsApi.obtainTags(params)
  }

  function setTag(params) {
    return tagsApi.setTags(params)
  }

  function createTag(params) {
    return tagsApi.createTag(params)
  }

  function deleteTagController(params) {
    return tagsApi.deleteTag(params)
  }

  function modifiedTag(params) {
    return tagsApi.modifiedTag(params)
  }

  return {
    getTags,
    setTag,
    createTag,
    deleteTagController,
    modifiedTag,
  }
}
