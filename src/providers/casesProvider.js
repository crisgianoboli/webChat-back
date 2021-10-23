'use strict'
const { groupBy, mapValues } = require('lodash')

module.exports = function CasesProvider({
  casesServices,
  // eventsApi,
  casesUtils,
}) {
  return {
    async groupedCasesProvider(params) {
      const [opened, closed] = await Promise.all([
        casesServices.sidebarCasesOpen(params),
        casesServices.sidebarCasesClosed(params),
      ])
      const groupedBy = groupBy(opened, d => d.CaseOrigin)
      const final = mapValues(groupedBy, v => v.length)
      const hidden = opened.filter(casesUtils.isHiddenCase)

      //TODO revisar esta lógica de negocio, que un caso sea abierto no significa que sea para gestionar.
      // if (opened > 0) {
      // eventsApi.send({ eventCode: 3 })
      // } else {
      // eventsApi.send({ eventCode: 4 })
      // }

      return {
        opened: opened.length,
        ...final,
        hidden: hidden.length,
        closed: closed.length,
      }
    },

    obtainCasesByStateOrSocialMedia({ filter }) {
      //TODO si el filtro no es una red social válida se debería arrojar un error
      //Un filtro válido sería uno qeu este dentro de X mapa
      switch (filter) {
        case 'opened':
          return casesServices.openedCases()
        case 'closed':
          return casesServices.closedCases()
        default:
          return casesServices.casesBySocialMedia(filter)
      }
    },
  }
}
