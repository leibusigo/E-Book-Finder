import { IReqGetBookDetail, IReqQueryBooks } from '../models/ReqModel'
import { IApiRes, IResGetBookDetail, IResQueryBooks } from '../models/ResModel'
import request from './request'

export async function queryBooksApi(options: IReqQueryBooks) {
  const { data } = await request.post<IApiRes<IResQueryBooks>>(
    '/api/search',
    options
  )

  return data
}

export async function queryDetailApi(options: IReqGetBookDetail) {
  const { data } = await request.post<IApiRes<IResGetBookDetail>>(
    '/api/detail',
    options
  )

  return data
}
