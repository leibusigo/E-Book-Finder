import { Middleware } from 'koa'
import { ErrorStat } from '../libs/stats'

/**
 * 检查执行过程中的异常
 * @param ctx
 * @param next
 */
const checkError: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ErrorStat) {
      ctx.status = error.status
      ctx.body = error
    } else {
      throw error
    }
  }
}

export default checkError
