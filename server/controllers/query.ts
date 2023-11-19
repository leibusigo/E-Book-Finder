import Joi from 'joi'
import Router from 'koa-router'
import axios from 'axios'

import { ErrorStat, JsonResp, stats } from '../libs/stats'
import validate from '../libs/validate'
import { IReqGetBookDetail, IReqQueryBooks } from '../model/ReqModel'
import { IResGetBookDetail, IResQueryBooks } from '../model/ResModel'

const router = new Router({
  prefix: '/api',
})

const BASE_URL = 'https://api.ylibrary.org/api'

// 查询电子书
router.post('/search', async ctx => {
  const body = validate(
    ctx.request.body as IReqQueryBooks,
    Joi.object({
      keyword: Joi.string().required(),
      page: Joi.number().required(),
      sensitive: Joi.bool().required(),
    })
  )
  try {
    const { data } = await axios.post<IResQueryBooks>(
      `${BASE_URL}/search`,
      body
    )

    if (!data.errorn) {
      ctx.body = new JsonResp({ data })
    } else {
      throw new ErrorStat(stats.RESPONSE_ERROR, data.msg || 'unknown error')
    }
  } catch (error) {
    throw new ErrorStat(
      stats.RESPONSE_ERROR,
      JSON.stringify(error) || 'unknown error'
    )
  }
})

router.post('/detail', async ctx => {
  const body = validate(
    ctx.request.body as IReqGetBookDetail,
    Joi.object({
      id: Joi.number().required(),
      sources: Joi.string().required(),
    })
  )
  try {
    const { data } = await axios.post<IResGetBookDetail>(
      `${BASE_URL}/detail`,
      body
    )

    if (!data.errorn) {
      ctx.body = new JsonResp({ data })
    } else {
      throw new ErrorStat(stats.RESPONSE_ERROR, data.msg || 'unknown error')
    }
  } catch (error) {
    throw new ErrorStat(
      stats.RESPONSE_ERROR,
      JSON.stringify(error) || 'unknown error'
    )
  }
})

export default router.routes()
