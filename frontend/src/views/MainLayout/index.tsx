import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import SideBar from './components/SideBar'
import { useEffect } from 'react'
import { queryBooks } from '../../service/api'
// import { useEffect, useRef } from 'react'
// import axios from 'axios'

const MainLayout = () => {
  // const ref = useRef<HTMLAnchorElement>(null)
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://cloudflare-ipfs.com/ipfs/bafykbzacecvhywls5mszo47e26irgrj73jfmir6d3w7rlu5t4fohun6wkcbna',
  //       { responseType: 'arraybuffer' }
  //     )
  //     .then(({ data }) => {
  //       const blob = new Blob([data])
  //       console.log(blob)

  //       if (ref.current) {
  //         ref.current!.href = URL.createObjectURL(blob)
  //         ref.current.download = '无限恐怖_zhttty_zhelper-search.epub'
  //         ref.current.click()
  //       }
  //     })
  // }, [])
  useEffect(() => {
    queryBooks({
      keyword: '无限恐怖',
      page: 1,
      sensitive: false,
    })
  }, [])
  return (
    <Layout style={{ height: '100vh' }}>
      <SideBar />
      <Layout>
        {/* <a ref={ref}></a> */}
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default MainLayout
