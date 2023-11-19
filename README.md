// 从 URL 中获取 filename 和 path
const urlParams = new URLSearchParams(window.location.search);
const filename = decodeURIComponent(urlParams.get('filename'));
const path = window.location.pathname.slice(1);

    // 检查filename和path是否为空
    if (!filename || !path) {
      alert('文件名或路径为空！');
      throw new Error('文件名或路径为空！');
    }

    // 构建下载地址列表
    const downloadUrls = [
      `https://cloudflare-ipfs.com/ipfs/${path}`,
      `https://dweb.link/ipfs/${path}`,
      `https://ipfs.io/ipfs/${path}`,
      `https://gateway.pinata.cloud/ipfs/${path}`
    ];

    // 跟踪下载进度
    let maxProgress = 0;
    let progressCount = 0;

function updateProgress() {
const progressElement = document.getElementById('progress');
const formattedProgress = maxProgress.toFixed(1); // 将进度值保留一位小数
progressElement.textContent = `文件 ${filename} 下载进度 ${formattedProgress}%`;
}

    // 下载文件并展示进度
    function downloadWithProgress(url, controller) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          responseType: 'arraybuffer',
          onDownloadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            console.log('下载进度：', progress);
            // 在这里更新进度条的显示
            maxProgress = Math.max(maxProgress, progress);
            updateProgress();
          },
          signal: controller.signal
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }

    // 启动下载并中断其他下载
    function startDownload() {
      const controllers = [];
      const downloadPromises = downloadUrls.map((url, index) => {
        const controller = new AbortController();
        controllers.push(controller);

        return new Promise((resolve, reject) => {
          downloadWithProgress(url, controller)
            .then((data) => {
              if (maxProgress === 100) {
                // 当有一个进程完成时中断其他下载
                for (let i = 0; i < controllers.length; i++) {
                  if (i !== index) {
                    controllers[i].abort();
                  }
                }
              }
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            })
            .finally(() => {
              progressCount++;
              if (progressCount === downloadUrls.length) {
                if (maxProgress !== 100) {
                  console.log('所有下载都被中断');
                }
              }
            });
        });
      });

      Promise.allSettled(downloadPromises)
        .then((results) => {
          const successfulDownloads = results.filter(
            (result) => result.status === 'fulfilled'
          );
          if (successfulDownloads.length > 0) {
            console.log(`下载完成：${successfulDownloads[0].value.length} bytes`);
            saveLocally(successfulDownloads[0].value);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // 保存文件到本地
    function saveLocally(data) {
      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }
    updateProgress();
    // 开始下载
    startDownload();
