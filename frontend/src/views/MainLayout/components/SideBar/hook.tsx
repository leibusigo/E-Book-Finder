import { BulbOutlined, FileSearchOutlined } from '@ant-design/icons'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const menuOptions = [
  {
    key: 'home',
    icon: <FileSearchOutlined />,
    label: '搜索',
  },
  {
    key: 'about',
    icon: <BulbOutlined />,
    label: '关于',
  },
]

const useSideBar = () => {
  const navigate = useNavigate()
  const [keys, setKeys] = useState<string[]>(['home'])

  const onMenuClick = useCallback(
    (key: string) => {
      navigate(`/${key}`)
      setKeys([key])
    },
    [navigate]
  )

  const onLogoClick = useCallback(() => {
    navigate(`/home`)
    setKeys(['home'])
  }, [navigate])

  return {
    keys,
    onMenuClick,
    onLogoClick,
  }
}

export default useSideBar
