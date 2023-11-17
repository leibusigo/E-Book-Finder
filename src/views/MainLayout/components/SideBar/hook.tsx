import { FileSearchOutlined, HistoryOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const menuOptions = [
  {
    key: 'home',
    icon: <FileSearchOutlined />,
    label: '搜索',
  },
  {
    key: 'history',
    icon: <HistoryOutlined />,
    label: '历史记录',
  },
]

const useSideBar = () => {
  const navigate = useNavigate()

  const onMenuClick = (key: string) => {
    navigate(`/${key}`)
  }

  return {
    onMenuClick,
  }
}

export default useSideBar
