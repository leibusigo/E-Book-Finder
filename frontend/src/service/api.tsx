import { IReqQueryBooks } from '../models/ReqModel'
import { IApiRes, IResQueryBooks } from '../models/ResModel'
import request from './request'

export async function queryBooksApi(options: IReqQueryBooks) {
  const { data } = await request.post<IApiRes<IResQueryBooks>>(
    '/api/search',
    options
  )

  return data
}
