import { useEffect, useState } from 'react'

import { IDetailModelProps } from '.'
import useDownLoad from '../../../../../../hooks/useDownLoad'

const useDetailModel = ({
  bookDetail: { ipfs_cid, title, extension },
  onOpenChange,
}: IDetailModelProps) => {
  const { downLoadref, maxProgress, downloadLoading, quickDownload } =
    useDownLoad(ipfs_cid || '', `${title}.${extension}`)
  const [isDownLoad, setIsDownload] = useState(false)

  useEffect(() => {
    setIsDownload(false)
  }, [])

  const handleClose = () => {
    onOpenChange(false)
    setIsDownload(false)
  }

  const handleDownload = async () => {
    setIsDownload(true)
    await quickDownload()
  }

  return {
    downLoadref,
    downloadLoading,
    maxProgress,
    isDownLoad,
    handleClose,
    handleDownload,
  }
}

export default useDetailModel
