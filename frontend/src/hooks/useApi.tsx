import { useState } from 'react'

import { queryBooksApi } from '../service/api'
import { IQueryDetails } from '../models/ResModel'

const useApi = () => {
  const [queryLoded, setQueryLoaded] = useState(false)
  const [resultList, setResultList] = useState<IQueryDetails[]>([])
  const [hits, setHits] = useState(0)
  const queryBooks = async (keyword: string, page = 1) => {
    try {
      setQueryLoaded(false)
      const { data } = await queryBooksApi({
        keyword,
        page,
        sensitive: false,
      })
      setResultList(data.data)
      setHits(data.hits)
    } catch (error) {
      console.error(error)
    } finally {
      setQueryLoaded(true)
    }
  }

  return {
    resultList,
    hits,
    queryLoded,
    queryBooks,
  }
}

export default useApi
