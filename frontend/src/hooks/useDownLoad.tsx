import { useRef, useState } from 'react'
import { downloadApi } from '../service/api'
import { AxiosProgressEvent } from 'axios'

export const downloadUrls: string[] = [
  `https://cloudflare-ipfs.com/ipfs`,
  `https://dweb.link/ipfs`,
  `https://ipfs.io/ipfs`,
  `https://gateway.pinata.cloud/ipfs`,
]

class SourceUrlManager {
  private downloadUrls: string[]
  private progressCount: number = 0
  private controllers: AbortController[] = []
  private maxProgress: number = 0
  private progresses: number[] = []
  static mSourceUrlManager: SourceUrlManager

  constructor(downloadUrls: string[]) {
    this.downloadUrls = downloadUrls
  }

  static getInstance(downloadUrls: string[]) {
    if (!SourceUrlManager.mSourceUrlManager) {
      SourceUrlManager.mSourceUrlManager = new SourceUrlManager(downloadUrls)
    }

    return SourceUrlManager.mSourceUrlManager
  }

  getWithCid(cid: string) {
    return this.downloadUrls.map(item => `${item}/${cid}`)
  }

  onProgress(
    progressEvent: AxiosProgressEvent,
    onMaxProgressChange: (progress: number) => void,
    index: number
  ) {
    if (progressEvent.total) {
      const progress = (progressEvent.loaded / progressEvent.total) * 100
      this.progresses[index] = progress
      // 在这里更新进度条的显示
      this.maxProgress = Number(
        Math.max(this.maxProgress, Math.max(...this.progresses)).toFixed(1)
      )
      onMaxProgressChange(this.maxProgress)
    }
  }

  requestAll(urls: string[], onMaxProgressChange: (progress: number) => void) {
    this.progressCount = 0
    this.controllers = []
    this.maxProgress = 0
    this.progresses = []
    const downloadPromises = urls.map((url, index) => {
      const controller = new AbortController()
      this.controllers.push(controller)
      this.progresses.push(0)

      return new Promise<string>((resolve, reject) => {
        downloadApi(url, controller, (progressEvent: AxiosProgressEvent) => {
          this.onProgress(progressEvent, onMaxProgressChange, index)
        })
          .then(data => {
            console.log('下载进度：', this.maxProgress)

            if (this.maxProgress === 100) {
              // 当有一个进程完成时中断其他下载
              for (let i = 0; i < this.controllers.length; i++) {
                if (i !== index) {
                  this.controllers[i].abort()
                }
              }
            }
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            this.progressCount++
            if (this.progressCount === urls.length) {
              if (this.maxProgress !== 100) {
                console.log('所有下载都被中断')
              }
            }
          })
      })
    })

    return downloadPromises
  }
}

const useDownLoad = (cid: string, fileName: string) => {
  const mSourceUrlManager = SourceUrlManager.getInstance(downloadUrls)
  const [maxProgress, setMaxProgress] = useState(0)
  const [downloadLoading, setDownLoading] = useState(false)
  const downLoadref = useRef<HTMLAnchorElement>(null)
  const urls = mSourceUrlManager.getWithCid(cid)

  const quickDownload = async () => {
    try {
      setDownLoading(true)
      setMaxProgress(0)
      const results = await Promise.allSettled(
        mSourceUrlManager.requestAll(urls, (progress: number) => {
          setMaxProgress(progress)
        })
      )
      const successfulDownloads = results.filter(
        result => result.status === 'fulfilled'
      )
      if (successfulDownloads.length > 0) {
        saveLocally(successfulDownloads[0])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDownLoading(false)
    }
  }

  const saveLocally = (result: PromiseSettledResult<string>) => {
    if (result.status === 'fulfilled') {
      const blob = new Blob([result.value])
      if (downLoadref.current) {
        downLoadref.current!.href = URL.createObjectURL(blob)
        downLoadref.current.download = fileName
        downLoadref.current.click()
      }
    }
  }

  return {
    downloadLoading,
    downLoadref,
    maxProgress,
    quickDownload,
  }
}
export default useDownLoad
