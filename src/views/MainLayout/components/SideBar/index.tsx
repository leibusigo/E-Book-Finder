import React from 'react'
import { Layout, Menu } from 'antd'

import styles from './index.module.scss'
import LogoBar from '../LogoBar'
import useSideBar, { menuOptions } from './hook'

const { Sider } = Layout

const SideBar = () => {
  const { onMenuClick } = useSideBar()

  return (
    <Sider className={styles.side} trigger={null}>
      <LogoBar />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['home']}
        items={menuOptions}
        onClick={({ key }) => {
          onMenuClick(key)
        }}
      />
    </Sider>
  )
}

export default SideBar
