import axios, { AxiosProgressEvent } from 'axios'
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

export async function downloadApi(
  url: string,
  controller: AbortController,
  onProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<string> {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      onProgress(progressEvent)
    },
    signal: controller.signal,
  })

  return data
}
