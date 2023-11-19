import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'
import useApi from '../../../../../hooks/useApi'

const useHomeContent = () => {
  const { resultList, queryLoded, hits, queryBooks } = useApi()
  const [firstScreenLoad, setFirstScrennLoad] = useState(true)
  const [value, setValue] = useState('')

  useEffect(() => {
    const subscription = PubSub.subscribe(
      'onSearch',
      async (_, data: { action: string; value: string }) => {
        if (data.action === 'input' && data.value.trim() !== '') {
          await queryBooks(data.value)
          setFirstScrennLoad(false)
          setValue(data.value)
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
  }

  return { hits, resultList, queryLoded, firstScreenLoad, onPageChange }
}

export default useHomeContent
