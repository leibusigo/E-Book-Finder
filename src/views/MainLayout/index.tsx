import { Layout, theme } from 'antd'

// import styles from './index.module.scss'
import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

const { Header, Content } = Layout

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout style={{ height: '100vh' }}>
      <SideBar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
