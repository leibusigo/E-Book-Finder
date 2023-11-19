import HeaderBar from './components/HeaderBar'
import { Content } from 'antd/es/layout/layout'
import { theme } from 'antd'
import HomeContent from './components/HomeContent'

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <>
      <HeaderBar />
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <HomeContent />
      </Content>
    </>
  )
}

export default HomePage
