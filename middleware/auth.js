/*
 * @Author: QuincyChen [chenquincy@qq.com] 
 * @Date: 2017-10-17 19:53:43 
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-12 18:35:05
 */

const { expireTime } = require('config').redis

// 验证权限
module.exports = () => async (ctx, next) => {
  try {
    // const url = ctx.request.url
    // if (url === '/api/v0/management/login' && ctx.request.method === 'POST') {
    //   // 博客开放页面API和管理端登录接口不需要验证token
    //   await next()
    // } else {
    //   // 管理端api需要验证token
    //   const token = (ctx.request.header['authorization'] || ' ').split(' ')[1]
    //   if (!token) {
    //     throw new ctx.AuthError('请传入token')
    //   } else {
    //     const userId = await Cache.get(`token-${token}`)
    //     const user = await Database.Manager.findById(userId)
    //     if (!user) {
    //       throw new ctx.AuthError('token已失效，请重新登录')
    //     }
    //     await Cache.expire(`token-${token}`, expireTime)
    //     ctx.state = { user }
    //   }
    await next()
    // }
  } catch (e) {
    if (e.status === 500 || e.status === undefined) {
      console.error(e)
      ctx.error(new ctx.ServiceUnavailableError('服务器未知错误'))
    } else {
      ctx.error(e)
    }
  }
}
