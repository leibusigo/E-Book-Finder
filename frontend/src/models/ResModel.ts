export interface IApiRes<T> {
  data: T
  code: number
}

export interface IResQueryBooks {
  data: IQueryDetails[]
  hits: number
}

export interface IQueryDetails {
  title: string
  author: string
  extension: string
  filesize: number
  year: string
  id: number
  source: string
  publisher?: string
}

export interface IResGetBookDetail extends IQueryDetails {
  md5: string
  description?: string
  ipfs_cid?: string
}
