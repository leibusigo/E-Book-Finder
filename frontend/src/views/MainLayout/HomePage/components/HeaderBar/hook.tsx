import { message } from 'antd'
import { SearchProps } from 'antd/es/input'
import PubSub from 'pubsub-js'
import { useEffect, useState } from 'react'

const useHeaderBar = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const subscription = PubSub.subscribe('onSearchLoaded', () => {
      setLoading(false)
    })

    return () => {
      PubSub.unsubscribe(subscription)
    }
  }, [])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    PubSub.publish('onSearch', {
      action: info?.source,
      value,
    })
    if (info?.source === 'input') {
      value.trim() === '' ? message.info('搜索不能为空') : setLoading(true)
    }
  }

  return {
    loading,
    onSearch,
  }
}

export default useHeaderBar
