import React from 'react'

import LOGOSVG from '../../../../../assets/imgs/logo.svg?react'
import styles from './index.module.scss'

interface IProps {
  onClickHandler: () => void
}

const LogoBar = React.memo(({ onClickHandler }: IProps) => {
  return (
    <div onClick={onClickHandler} className={styles.logo_warp}>
      <LOGOSVG className={styles.logo_icon} />
      <h1 className={styles.logo_name}>E-BOOK-FINDER</h1>
    </div>
  )
})

export default LogoBar
