'use strict'

module.exports = function CasesServices({ casesApi, casesUtils }) {
  function openedCases() {
    return Promise.all([
      casesApi.obtainOpenedCases(),
      casesApi.obtainIcons(),
    ]).then(casesUtils.customizeResponse)
  }

  function closedCases() {
    return Promise.all([
      casesApi.obtainClosedCases(),
      casesApi.obtainIcons(),
    ]).then(casesUtils.customizeResponse)
  }

  function casesBySocialMedia(socialMedia) {
    return openedCases().then(res =>
      res.filter(e => e.CaseOrigin === socialMedia)
    )
  }

  function sidebarCasesOpen() {
    return casesApi.obtainOpenedCases().then(casesUtils.customizeSidebar)
  }

  function sidebarCasesClosed() {
    return casesApi.obtainClosedCases().then(casesUtils.customizeSidebar)
  }

  return {
    openedCases,
    closedCases,
    casesBySocialMedia,
    sidebarCasesOpen,
    sidebarCasesClosed,
  }
}
