import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'
import useQueryBook from '../../../../../hooks/useApi'

const useHomeContent = () => {
  const { resultList, queryLoded, total, queryBooks } = useQueryBook()
  const [firstScreenLoad, setFirstScrennLoad] = useState(true)
  const [value, setValue] = useState('')
  const [maxPage, setMaxPage] = useState(1)
  const [curPage, setCurPage] = useState(1)

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

    if (queryLoded) {
      PubSub.publish('onSearchLoaded')
    }

    return () => {
      PubSub.unsubscribe(subscription)
    }
  }, [queryBooks, queryLoded, resultList.length])

  const onPageChange = async (page: number) => {
    await queryBooks(value, page)
    if (page > maxPage && resultList.length !== 0) {
      setMaxPage(page)
    }
    setCurPage(page)
  }

  return {
    total,
    curPage,
    maxPage,
    resultList,
    queryLoded,
    firstScreenLoad,
    onPageChange,
  }
}

export default useHomeContent
