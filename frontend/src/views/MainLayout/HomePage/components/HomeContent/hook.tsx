import PubSub from 'pubsub-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import useQueryBook from '../../../../../hooks/useQueryBook'
import { IQueryDetails } from '../../../../../models/ResModel'
import useDetail from '../../../../../hooks/useDetail'

const useHomeContent = () => {
  const { resultList, queryLoaded, total, queryBooks } = useQueryBook()
  const { bookDetail, getDetailLoaded, getBookDetail } = useDetail()
  const [firstScreenLoad, setFirstScrennLoad] = useState(true)
  const [value, setValue] = useState('')
  const [maxPage, setMaxPage] = useState(1)
  const [curPage, setCurPage] = useState(1)
  const warpRef = useRef<HTMLDivElement>(null)
  const [modelOpen, setModelOpen] = useState(false)

  useEffect(() => {
    const subscription = PubSub.subscribe(
      'onSearch',
      async (_, data: { action: string; value: string }) => {
        if (data.action === 'input' && data.value.trim() !== '') {
          await queryBooks(data.value)
          setFirstScrennLoad(false)
          setValue(data.value)
          setMaxPage(1)
          setCurPage(1)
        }
      }
    )

    if (queryLoaded) {
      PubSub.publish('onSearchLoaded')
    }

    return () => {
      PubSub.unsubscribe(subscription)
    }
  }, [queryBooks, queryLoaded, resultList.length])

  const onPageChange = useCallback(
    async (page: number) => {
      await queryBooks(value, page)
      if (page > maxPage && resultList.length !== 0) {
        setMaxPage(page)
      }
      setCurPage(page)
    },
    [maxPage, queryBooks, resultList.length, value]
  )

  const onOpenChangeHandler = useCallback((open: boolean) => {
    setModelOpen(open)
  }, [])

  const onItemClick = useCallback(
    (item: IQueryDetails) => {
      setModelOpen(true)
      getBookDetail(item)
    },
    [getBookDetail]
  )

  return {
    bookDetail,
    modelOpen,
    warpRef,
    total,
    curPage,
    maxPage,
    resultList,
    queryLoaded,
    getDetailLoaded,
    firstScreenLoad,
    onPageChange,
    onOpenChangeHandler,
    onItemClick,
  }
}

export default useHomeContent
