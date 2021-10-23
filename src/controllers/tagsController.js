'use strict'

module.exports = function TagsController({ controllerWrapper, tagsProvider }) {
  function getTagsController(req, res, next) {
    const { groupAccountId: GroupAccountId } = req.params
    const { managementCaseId: ManagementLevelInternalCodeId } = req.query
    let { allowUserToCreateTags: AllowUserToCreateTags } = req.query

    AllowUserToCreateTags = AllowUserToCreateTags ? 1 : 0

    return controllerWrapper.async(
      { GroupAccountId, ManagementLevelInternalCodeId, AllowUserToCreateTags },
      tagsProvider.getTags,
      res,
      next
    )
  }

  function setTagAtComment(req, res, next) {
    const {
      caseCommentId: CaseCommentId,
      userId: TagModifiedByUser,
      selectedTags,
    } = req.body

    return controllerWrapper.async(
      { CaseCommentId, TagModifiedByUser, selectedTags },
      tagsProvider.setTag,
      res,
      next
    )
  }

  function createTagController(req, res, next) {
    const { groupAccountId: GroupAccountId } = req.params
    const {
      tagName: TagName,
      userAssignedId: TagModifiedByUser,
      caseCommentId: CaseCommentId,
    } = req.body

    return controllerWrapper.async(
      { GroupAccountId, TagModifiedByUser, TagName, CaseCommentId },
      tagsProvider.createTag,
      res,
      next
    )
  }

  function deleteTagController(req, res, next) {
    const { tagId: TagId } = req.params
    const {
      userId: TagModifiedByUser,
      caseCommentId: CaseCommentId,
      groupAccountId: GroupAccountId,
    } = req.body
    return controllerWrapper.async(
      {
        TagModifiedByUser,
        GroupAccountId,
        CaseCommentId,
        TagId,
      },
      tagsProvider.deleteTagController,
      res,
      next
    )
  }

  function modifiedTag(req, res, next) {
    const { tagId: TagId } = req.params
    const { tagName: TagName, userId: TagModifiedByUser } = req.body
    return controllerWrapper.async(
      {
        TagId,
        TagName,
        TagModifiedByUser,
      },
      tagsProvider.modifiedTag,
      res,
      next
    )
  }

  return {
    getTagsController,
    setTagAtComment,
    createTagController,
    deleteTagController,
    modifiedTag,
  }
}
