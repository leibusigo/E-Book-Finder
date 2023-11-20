import { Button, Modal, Spin } from 'antd'

import useDetailModel from './hook'
import { IResGetBookDetail } from '../../../../../../models/ResModel'
import { changeByte } from '../../../../../../utils/byteFormat'
import { useMemo } from 'react'

export interface IDetailModelProps {
  bookDetail: IResGetBookDetail
  open: boolean
  onOpenChange: (open: boolean) => void
  getDetailLoaded: boolean
}

const DetailModel = (Props: IDetailModelProps) => {
  const { handleOk, handleCancel } = useDetailModel(Props)
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

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={
          !getDetailLoaded
            ? []
            : [
                <Button key="取消" onClick={handleCancel}>
                  取消
                </Button>,
                <Button
                  key="下载"
                  type="primary"
                  disabled={!ipfs_cid}
                  onClick={handleOk}
                >
                  {ipfs_cid ? '下载' : '该文件暂不支持下载'}
                </Button>,
              ]
        }
      >
        {!getDetailLoaded ? <Spin /> : detailInfo}
      </Modal>
    </>
  )
}

export default DetailModel
