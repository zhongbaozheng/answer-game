/*
 * @Author: QuincyChen [chenquincy@qq.com] 
 * @Date: 2017-10-17 19:53:35 
 * @Last Modified by:   QuincyChen 
 * @Last Modified time: 2017-10-17 19:53:35 
 */

class BadRequestError extends Error {
  constructor (message) {
    super()
    this.name = '参数验证失败'
    this.message = message
    this.status = 400
  }
}

class AuthError extends Error {
  constructor (message) {
    super()
    this.name = '认证失败'
    this.message = message
    this.status = 401
  }
}

class PermissionDeniedError extends Error {
  constructor (message) {
    super()
    this.message = message || '权限不足'
    this.status = 403
  }
}

class ForbiddenError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.status = 403
  }
}

class NotFoundError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.status = 404
  }
}

class ServiceUnavailableError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.status = 503
  }
}

module.exports = {
  BadRequestError,
  AuthError,
  PermissionDeniedError,
  ForbiddenError,
  NotFoundError,
  ServiceUnavailableError
}
