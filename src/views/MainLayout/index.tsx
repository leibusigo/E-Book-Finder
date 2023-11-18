import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import SideBar from './components/SideBar'

const MainLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <SideBar />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default MainLayout
