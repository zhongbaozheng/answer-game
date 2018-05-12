/*
 * @Author: QuincyChen [chenquincy@qq.com] 
 * @Date: 2017-10-17 19:53:52 
 * @Last Modified by:   QuincyChen 
 * @Last Modified time: 2017-10-17 19:53:52 
 */

// 错误统一处理
module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.status === 500 || e.status === undefined) {
      console.error(e)
      ctx.error(new ctx.ServiceUnavailableError('服务器未知错误'))
    } else {
      ctx.error(e)
    }
  }
}
