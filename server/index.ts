import 'dotenv/config'
import Koa from 'koa'
import KoaBody from 'koa-body'
import path from 'path'

import checkError from './middlewares/checkError'
import logger from './middlewares/logger'
import router from './router'

// 创建app实例
const app = new Koa()
// 第一个中间件，日志中间件
app.use(logger)
// 第二个中间件，捕捉异常中间件
app.use(checkError)
// 注册koa-body
app.use(KoaBody())

// 注册路由
app.use(router)
async function run() {
  // 监听端口
  app.listen('3000', () => {
    console.log(`listen http://localhost:3000`)
  })
}
run()
