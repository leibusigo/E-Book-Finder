import { Navigate, Route, Routes } from 'react-router-dom'
// import styles from "./index.module.scss"
import NotFound from '../NotFound'
import MainLayout from '../MainLayout'
import HomePage from '../MainLayout/HomePage'
import HistoryPage from '../MainLayout/HistoryPage'
import { ConfigProvider, Empty, theme } from 'antd'

const App = () => {
  return (
    // dark: theme.darkAlgorithm
    <ConfigProvider
      renderEmpty={() => <Empty description={'暂无数据'} />}
      theme={{
        algorithm: theme.defaultAlgorithm,
        //  token: {
        //   colorBgContainer:'#000000'
        //  }
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App
