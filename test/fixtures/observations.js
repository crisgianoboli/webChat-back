'use strict'

const fullName = 'Juan de los Palotes'

const Observations = [
  {
    PersonFullName: fullName,
    ObservationId: 1234,
    CaseId: 13245,
    Description: 'Test observation',
    ObservationCreationDate: '12/12/12',
    ModifiedByUserId: 159,
    UserName: 'Juancito',
    ModifiedDate: '13/12/12',
    Crud: 0,
    EntityState: 0,
    TestAttribute: 'Extra atrribute',
  },
]

const customizedObservation = {
  PersonFullName: fullName,
  ObservationId: 1234,
  CaseId: 13245,
  Description: 'Test observation',
  ObservationCreationDate: '12/12/12',
  ModifiedByUserId: 159,
  UserName: 'Juancito',
  ModifiedDate: '13/12/12',
  Crud: 0,
  EntityState: 0,
}

module.exports = { Observations, customizedObservation }
