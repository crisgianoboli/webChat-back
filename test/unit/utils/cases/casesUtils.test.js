'use strict'

const test = require('ava')
const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const CasesUtils = require('../../../../src/utils/cases/casesUtils')
const sandbox = sinon.createSandbox()

test.afterEach(() => {
  sandbox.restore()
})

function macro(t, input, expected) {
  const isHidden = CasesUtils().isHiddenCase(input)
  expect(isHidden).to.equal(expected)
}
macro.title = (providedTitle = '', input, expected) =>
  `${providedTitle} ${input} = ${expected}`.trim()

test(
  'Si esta en falso y el ultimo comentario es el del cliente a travéz de un celular se debe mostrar',
  macro,
  {
    Cliente: '3',
    StateShowCase: false,
  },
  false
)
test(
  'Si esta en falso y el ultimo comentario es el del cliente se debe mostrar',
  macro,
  {
    Cliente: '1',
    StateShowCase: false,
  },
  false
)
test(
  'Si esta en 1 o true siempre se muestra.',
  macro,
  {
    Cliente: '1',
    StateShowCase: true,
  },
  false
)
test(
  'Si esta en falso y el ultimo comentario es del representante no se debe mostrar.',
  macro,
  {
    Cliente: '0',
    StateShowCase: false,
  },
  true
)
test(
  'Si esta en falso y el ultimo comentario es del representante con cliente a travéz del celular no se debe mostrar',
  macro,
  {
    Cliente: '2',
    StateShowCase: false,
  },
  true
)
test(
  'Si esta en falso y el ultimo comentario es del bot no se debe mostrar',
  macro,
  {
    Cliente: '4',
    StateShowCase: false,
  },
  true
)
