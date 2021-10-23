'use strict'
const { asFunction, createContainer, Lifetime } = require('awilix')
const { scopePerRequest } = require('awilix-express')

module.exports = function setupInversionOfControl({ app }) {
  const container = createContainer()
  container.loadModules(
    [
      ['*/providers/*.js'], // shortcut to make all services scoped
      ['*/providers/**/*.js'], // shortcut to make all services scoped
      ['*/controllers/utils/*.js'], // shortcut to make all services scoped
      ['*/services/*.js'], // shortcut to make all services scoped
      ['*/utils/*.js'],
      ['*/utils/**/*.js'],
      ['*/client/**/*.js'],
      // ['*/client/**/*client.js', { register: asValue }],
      ['*/client/events/*client.js'],
      ['*/client/*client.js'],
      ['*/config/config.js'],
    ],
    {
      // we want `TodosService` to be registered as `todosService`.
      formatName: 'camelCase',
      resolverOptions: {
        register: asFunction,
        lifetime: Lifetime.SCOPED,
      },
    }
  )

  app.use(scopePerRequest(container))
}
