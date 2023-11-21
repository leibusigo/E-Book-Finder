import { Button, Modal, Progress, Spin } from 'antd'
import { useMemo } from 'react'

import styles from './index.module.scss'
import useDetailModel from './hook'
import { IResGetBookDetail } from '../../../../../../models/ResModel'
import { changeByte } from '../../../../../../utils/byteFormat'

export interface IDetailModelProps {
  bookDetail: IResGetBookDetail
  open: boolean
  onOpenChange: (open: boolean) => void
  getDetailLoaded: boolean
}

const DetailModel = (Props: IDetailModelProps) => {
  const {
    downLoadref,
    downloadLoading,
    maxProgress,
    isDownLoad,
    handleClose,
    handleDownload,
  } = useDetailModel(Props)
  const { open, bookDetail, getDetailLoaded } = Props
  const { title, author, extension, year, filesize, description, ipfs_cid } =
    bookDetail

  const detailInfo = useMemo(() => {
    return (
      <div>
        <h1>书名：{title}</h1>
        <p>作者：{author}</p>
        <p>格式：{extension}</p>
        <p>年份：{year}</p>
        <p>大小：{changeByte(filesize)}</p>
        <p>简介：{description}</p>
      </div>
    )
  }, [author, description, extension, filesize, title, year])

  const downLoadProgress = useMemo(() => {
    return (
      <div>
        <Progress percent={maxProgress} />
        <a className={styles.save_button} ref={downLoadref}>
          保存到本地
        </a>
      </div>
    )
  }, [downLoadref, maxProgress])

  return (
    <>
      <Modal
        open={open}
        title="详情"
        onOk={handleClose}
        onCancel={handleClose}
        maskClosable={false}
        footer={
          !getDetailLoaded ? (
            []
          ) : isDownLoad && !downloadLoading ? (
            <Button type="primary" onClick={handleClose}>
              下载完成
            </Button>
          ) : (
            [
              <Button key="取消" onClick={handleClose}>
                取消
              </Button>,
              <Button
                key="下载"
                loading={downloadLoading}
                type="primary"
                disabled={!ipfs_cid}
                onClick={() => {
                  ipfs_cid ? handleDownload() : handleClose()
                }}
              >
                {ipfs_cid ? '下载' : '该文件暂不支持下载'}
              </Button>,
            ]
          )
        }
      >
        {!getDetailLoaded ? (
          <Spin />
        ) : isDownLoad ? (
          downLoadProgress
        ) : (
          detailInfo
        )}
      </Modal>
    </>
  )
}

export default DetailModel
