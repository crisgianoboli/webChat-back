'use strict'

const { MiddlewareError } = require('../../errors/MiddlewareError')
const jwt = require('jsonwebtoken')
const { asValue } = require('awilix')
const config = require('../../config/config')

const jwtDecode = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MiddlewareError(
      'La cabecera no tiene la clave de autorizacion',
      403
    )
  }
  try {
    const [, token] = req.headers.authorization.split(' ')
    const payload = jwt.decode(token)
    const profileToken = req.headers.profile

    const profilePayload = jwt.verify(
      profileToken,
      config().login.profile_settings.key
    )

    req.user = {
      //TODO check this information from userSession
      userName: req.headers['x-epiron-user'],
      userGUID: payload.UserGuid,
      userId: payload.UserId,
      authorization: token,
      userInfo: profilePayload.UserSession,
    }
    req.container.register({
      user: asValue(req.user),
    })
    next()
  } catch (error) {
    throw new MiddlewareError('Token no valido', 401)
  }
}

module.exports = {
  jwtDecode,
}
