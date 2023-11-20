import { useState } from 'react'

import { queryDetailApi } from '../service/api'
import { IReqGetBookDetail } from '../models/ReqModel'
import { IResGetBookDetail } from '../models/ResModel'

const useDetail = () => {
  const [getDetailLoaded, setGetDetailLoaded] = useState(true)
  const [bookDetail, setBookDetail] = useState<IResGetBookDetail>(
    {} as IResGetBookDetail
  )

  const getBookDetail = async (options: IReqGetBookDetail) => {
    try {
      setGetDetailLoaded(false)
      const { data } = await queryDetailApi(options)
      setBookDetail(data)
    } catch (error) {
      setBookDetail({} as IResGetBookDetail)
      console.error(error)
    } finally {
      setGetDetailLoaded(true)
    }
  }

  return {
    bookDetail,
    getDetailLoaded,
    getBookDetail,
  }
}

export default useDetail
