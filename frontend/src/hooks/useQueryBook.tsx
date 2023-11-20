import { useState } from 'react'

import { queryBooksApi } from '../service/api'
import { IQueryDetails, IResQueryBooks } from '../models/ResModel'

const dataMap = new Map()

const useQueryBook = () => {
  const [queryLoaded, setQueryLoaded] = useState(false)
  const [resultList, setResultList] = useState<IQueryDetails[]>([])
  const [hits, setHits] = useState(0)
  const [total, setTotal] = useState(0)

  const queryBooks = async (keyword: string, page = 1) => {
    try {
      const mapKey = keyword + page
      setQueryLoaded(false)
      let data: IResQueryBooks = {} as IResQueryBooks
      // 有缓存直接使用缓存
      if (dataMap.has(mapKey)) {
        data = dataMap.get(mapKey)
        const _total = (page - 1) * 20 + data.data.length
        setTotal(_total > total ? _total : total)
        // 否则请求接口
      } else {
        const res = await queryBooksApi({
          keyword,
          page,
          sensitive: false,
        })
        data = res.data
        dataMap.set(mapKey, data)
        setTotal((page - 1) * 20 + data.data.length)
      }
      if (JSON.stringify(data) !== '{}') {
        setResultList(data.data)
        setHits(data.hits)
      }
    } catch (error) {
      setResultList([])
      console.error(error)
    } finally {
      setQueryLoaded(true)
    }
  }

  return {
    total,
    resultList,
    hits,
    queryLoaded,
    queryBooks,
  }
}

export default useQueryBook
