/**
 * 将字节转成B  KB MB GB
 * @param byte number
 * @returns string
 */
export const changeByte = (byte: number) => {
  let size = ''
  if (byte < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = `${byte.toFixed(2)}B`
  } else if (byte < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = `${(byte / 1024).toFixed(2)}KB`
  } else if (byte < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = `${(byte / (1024 * 1024)).toFixed(2)}MB`
  } else {
    // 其他转化成GB
    size = `${(byte / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  const sizeStr = `${size}` // 转成字符串
  const index = sizeStr.indexOf('.') // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  // eslint-disable-next-line eqeqeq
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
