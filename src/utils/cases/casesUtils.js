'use strict'

module.exports = function CasesUtils() {
  function getCaseOrigin(value) {
    switch (value) {
      /*TODO deberiamos tener un archivo de configuraciones que tenga todos estos valores para hacer más dinámica esta validacion.
       */
      case 0:
        return 'Casos Cerrados'
      case 1:
        return 'Mail'
      case 2:
        return 'Twitter'
      case 3:
        return 'Facebook'
      case 4:
        return 'SMS'
      case 5:
        return 'Telegram'
      case 6:
        return 'MercadoLibre'
      case 7:
        return 'Mensajero'
      case 8:
        return 'Chat'
      case 9:
        return 'VideoConferencia'
      case 10:
        return 'ApiChat'
      case 11:
        return 'Instagram'
      case 12:
        return 'Youtube'
      case 13:
        return 'WhatsApp'
      case 14:
        return 'GooglePlay'
      default:
        return 'undefined'
    }
  }

  function channelIcon(elementTypeId, icons) {
    return icons[elementTypeId][0].ElementTypeImage
  }

  function isHiddenCase({ Cliente: user, StateShowCase: showCase }) {
    return !(showCase || user === '1' || user === '3')
  }

  function customizeSidebar(cases) {
    return cases.map(
      ({
        CaseId,
        ClientFullName,
        Followers,
        CaseCreated,
        CaseModifiedDate,
        TimeLastComentClient,
        Notifications,
        Cliente,
        StateName,
        UCUserName,
        CaseTypeName,
        AttentionQueueName,
        ProfileImage,
        AlertColorsCode,
        ...e
      }) => ({
        CaseId,
        ClientFullName,
        Followers,
        CaseCreated,
        CaseModifiedDate,
        TimeLastComentClient,
        Notifications,
        Cliente,
        StateName,
        UCUserName,
        CaseTypeName,
        AttentionQueueName,
        ProfileImage,
        AlertColorsCode,
        CaseOrigin: getCaseOrigin(e.SCInternalCode),
      })
    )
  }
  return {
    getCaseOrigin,
    channelIcon,
    isHiddenCase,
    customizeSidebar,
    customizeResponse([cases, icons]) {
      return cases.map(
        ({
          CaseId,
          ClientFullName,
          Followers,
          CaseCreated,
          CaseModifiedDate,
          TimeLastComentClient,
          Notifications,
          Cliente,
          StateName,
          UCUserName,
          CaseTypeName,
          AttentionQueueName,
          ProfileImage,
          AlertColorsCode,
          ...e
        }) => ({
          CaseId,
          ClientFullName,
          Followers,
          CaseCreated,
          CaseModifiedDate,
          TimeLastComentClient,
          Notifications,
          Cliente,
          StateName,
          UCUserName,
          CaseTypeName,
          AttentionQueueName,
          ProfileImage,
          AlertColorsCode,
          CaseOrigin: getCaseOrigin(e.SCInternalCode),
          ChannelIcon: channelIcon(e.ElementTypeId, icons),
        })
      )
    },
  }
}
