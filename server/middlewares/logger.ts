import dayjs from 'dayjs'
import { Middleware } from 'koa'
import { ErrorStat, JsonResp } from '../libs/stats'

/**
 * 请求日志中间件
 * @param ctx
 * @param next
 */
const logger: Middleware = async (ctx, next) => {
  const startTime = Date.now()
  await next()
  const endTime = Date.now()
  const logs = ctx.state.logs || {}
  const info: any = {
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    method: ctx.method,
    url: ctx.url,
    ip: ctx.request.ip,
    status: ctx.status,
    cost: endTime - startTime,
    ...logs,
  }
  // 如果body中的数据是JsonResp的实例
  if (ctx.body instanceof JsonResp) info.code = ctx.body.code
  //   如果body中的数据是错误类的实例
  if (ctx.body instanceof ErrorStat) info.message = ctx.body.message
  console.log(JSON.stringify(info))
}

export default logger
