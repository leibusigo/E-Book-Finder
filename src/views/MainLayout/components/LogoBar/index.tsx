import React from 'react'

import LOGOSVG from '../../../../assets/imgs/logo.svg?react'
import styles from './index.module.scss'

const LogoBar = () => {
  return (
    <div className={styles.logo_warp}>
      <LOGOSVG className={styles.logo_icon} />
      <h1 className={styles.logo_name}>E-BOOK_FINDER</h1>
    </div>
  )
}

export default LogoBar
