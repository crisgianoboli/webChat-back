'use strict'

module.exports = function TagsApi({
  client,
  requestFormatter,
  tagsFormatter,
  requestBuilder,
}) {
  function obtainTags({
    GroupAccountId,
    ManagementLevelInternalCodeId,
    AllowUserToCreateTags,
  }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Tag_sService',
        BusinessData: {
          GroupAccountId,
          ManagementLevelInternalCodeId,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) =>
        requestBuilder.build(tagsFormatter.formatTagsForCreatePermits, {
          data,
          AllowUserToCreateTags,
        })
      )
      .then(data => ({ tags: data }))
  }

  function setTags({ CaseCommentId, TagModifiedByUser, selectedTags }) {
    const setsTags = []
    //FIXME revisar que pushee cada CaseCommentTagId dentro del array de respuesta
    return new Promise(resolve => {
      selectedTags.forEach(tag => {
        requestBuilder
          .build(requestFormatter.format, {
            ServiceName: 'CaseCommentTag_iService',
            BusinessData: {
              CaseCommentId,
              TagId: tag.TagId,
              TagModifiedByUser,
            },
          })
          .then(request => client.post('/', request))
          .then(({ data }) => {
            setsTags.push(data.CaseCommentTagId)
          })
      })
      resolve(setsTags)
    })
  }

  function createTag({
    GroupAccountId,
    TagModifiedByUser,
    TagName,
    CaseCommentId,
  }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Tag_iService',
        BusinessData: {
          GroupAccountId,
          TagName,
          TagModifiedByUser,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => {
        if (CaseCommentId) {
          return requestBuilder.build(requestFormatter.format, {
            ServiceName: 'CaseCommentTag_iService',
            BusinessData: {
              CaseCommentId,
              TagModifiedByUser,
              TagId: data.TagId,
            },
          })
        } else {
          return data
        }
      })
      .then(request => {
        if (CaseCommentId) {
          return client.post('/', request)
        } else {
          return request
        }
      })
      .then(response => {
        if (CaseCommentId) {
          return response.data
        } else {
          return response
        }
      })
  }

  function deleteTag({
    TagModifiedByUser,
    GroupAccountId,
    CaseCommentId,
    TagId,
  }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'CaseCommentTag_uService',
        BusinessData: {
          TagModifiedByUser,
          GroupAccountId,
          CaseCommentId,
          TagId,
          CaseCommentTagActiveFlag: false,
          CaseCommentTagLogTransaction: 'D',
          CaseCommentTagCreated: new Date(),
          TagName: '',
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
  }

  function modifiedTag({ TagId, TagName, tagModifiedByUser }) {
    return requestBuilder
      .build(requestFormatter.format, {
        ServiceName: 'Tag_uService',
        BusinessData: {
          TagId,
          TagName,
          tagModifiedByUser,
        },
      })
      .then(request => client.post('/', request))
      .then(({ data }) => data)
  }

  return {
    obtainTags,
    setTags,
    createTag,
    deleteTag,
    modifiedTag,
  }
}
