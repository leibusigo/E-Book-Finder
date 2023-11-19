import React from 'react'

import styles from './index.module.scss'

interface IProps {
  title: string
  width: number
}

const ERouterPageTitle = React.memo(({ title, width }: IProps) => {
  return (
    <h1 style={{ width: `${width}px` }} className={styles.router_title}>
      {title}
    </h1>
  )
})

export default ERouterPageTitle
