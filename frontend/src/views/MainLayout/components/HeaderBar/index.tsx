import { Layout, theme, Input } from 'antd'

import styles from './index.module.scss'
import useHeaderBar from './hook'
import EGitHubButton from '../../../../components/EGitHubButton'
import ERouterPageTitle from '../../../../components/ERouterPageTitle'

const { Header } = Layout
const { Search } = Input

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { onSearch } = useHeaderBar()
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className={styles.warp}>
        <ERouterPageTitle title="搜索电子书" width={120} />
        <Search
          placeholder="输入电子书名称"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
        <EGitHubButton />
      </div>
    </Header>
  )
}

export default HeaderBar
