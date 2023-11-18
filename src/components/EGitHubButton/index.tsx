import React from 'react'
import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import styles from './index.module.scss'

interface IProps {
  className?: string
}

const EGitHubButton = React.memo(({ className }: IProps) => {
  return (
    <div className={`${styles.tips} ${className}`}>
      <Button
        href={'https://github.com/leibusigo/E-Book-Finder'}
        target={'_blank'}
        type="text"
        size={'large'}
        icon={<GithubOutlined style={{ fontSize: '25px' }} />}
      />
    </div>
  )
})

export default EGitHubButton
