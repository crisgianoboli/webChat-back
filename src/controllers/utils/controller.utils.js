'use strict'

async function asyncController(providerArgs, provider, res, next) {
  try {
    const response = await provider(providerArgs)
    return res.status(200).send(response)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  asyncController,
}
