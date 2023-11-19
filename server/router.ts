import Router from 'koa-router'
import query from './controllers/query'

// 创建路由实例
const router = new Router()

// 汇总子路由，从这跳转到-->controllers文件夹
router.use(query)

// 默认暴露
export default router.routes()
