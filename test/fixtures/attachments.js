'use strict'

const attachment = {
  CaseCommentId: 132456,
  CaseId: 12345,
  ConversationId: 1234,
  CaseCommentAttachmentList: `First element attachment's list`,
}

const listCaseFileAttachmentBE = [
  {
    MediaCategory: 'file format',
    ObservationsFileAttachmentId: 123,
    CaseFileId: 1234,
    CaseId: 12345,
    ObservationsFileAttachmentName: 'file name',
    ObservationsFileAttachment: 'file',
    ObservationsFileTransferEncoding: 'N/A',
    ObservationsFileIsAttachmentOnBody: 'N/A',
    ObservationsFileAttachmentOnBodyContent: 'N/A',
    ObservationsFileAttachmentCreated: '12/12/12',
    MediaTypeId: 123456,
    ObservationsAttachmentModifiedByUser: 156,
    MediaTypeName: 'testFile',
    CreationTimeElapsed: '13/12/12',
    AttachmentLenght: 753,
    ObservationsFileAttachmentLink: 'N/A',
    TemplateJSON: 'JSON template',
    IsNew: 'bool',
    UserName: 'JP',
    EntityState: 0,
    TestAttribute: 'Extra atrribute',
  },
]

const fileAttachmented = {
  MediaCategory: 'file format',
  ObservationsFileAttachmentId: 123,
  CaseFileId: 1234,
  CaseId: 12345,
  ObservationsFileAttachmentName: 'file name',
  ObservationsFileAttachment: 'file',
  ObservationsFileTransferEncoding: 'N/A',
  ObservationsFileIsAttachmentOnBody: 'N/A',
  ObservationsFileAttachmentOnBodyContent: 'N/A',
  ObservationsFileAttachmentCreated: '12/12/12',
  MediaTypeId: 123456,
  ObservationsAttachmentModifiedByUser: 156,
  MediaTypeName: 'testFile',
  CreationTimeElapsed: '13/12/12',
  AttachmentLenght: 753,
  ObservationsFileAttachmentLink: 'N/A',
  TemplateJSON: 'JSON template',
  IsNew: 'bool',
  UserName: 'JP',
  EntityState: 0,
}

module.exports = { attachment, listCaseFileAttachmentBE, fileAttachmented }
