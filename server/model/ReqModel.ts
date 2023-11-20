export interface IReqQueryBooks {
  keyword: string
  page: number
  sensitive: boolean
}

export interface IReqGetBookDetail {
  id: number
  source: string
}
