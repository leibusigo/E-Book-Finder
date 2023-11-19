import { Layout, Menu } from 'antd'

import styles from './index.module.scss'
import LogoBar from './LogoBar'
import useSideBar, { menuOptions } from './hook'

const { Sider } = Layout

const SideBar = () => {
  const { keys, onMenuClick, onLogoClick } = useSideBar()

  return (
    <Sider theme="dark" className={styles.side} trigger={null}>
      <LogoBar onClickHandler={onLogoClick} />
      <Menu
        selectedKeys={keys}
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
