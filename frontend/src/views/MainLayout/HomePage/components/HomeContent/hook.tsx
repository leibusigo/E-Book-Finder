import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'
import useQueryBook from '../../../../../hooks/useApi'

const useHomeContent = () => {
  const { resultList, queryLoded, queryBooks } = useQueryBook()
  const [firstScreenLoad, setFirstScrennLoad] = useState(true)
  const [value, setValue] = useState('')
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    const subscription = PubSub.subscribe(
      'onSearch',
      async (_, data: { action: string; value: string }) => {
        if (data.action === 'input' && data.value.trim() !== '') {
          await queryBooks(data.value)
          setFirstScrennLoad(false)
          setValue(data.value)
          setMaxPage(1)
        }
      }
    )

    if (queryLoded) {
      PubSub.publish('onSearchLoaded')
    }

    return () => {
      PubSub.unsubscribe(subscription)
    }
  }, [queryBooks, queryLoded])

  const onPageChange = async (page: number) => {
    if (value) {
      await queryBooks(value, page)
    }
    if (page > maxPage) {
      setMaxPage(page)
    }
  }

  return {
    resultList,
    queryLoded,
    firstScreenLoad,
    maxPage,
    onPageChange,
  }
}

export default useHomeContent
