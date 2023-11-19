import { promises as fs } from 'fs'

// 异步读取 JSON 文件
export async function readJsonFile(path: string): Promise<any> {
  try {
    const jsonData = await fs.readFile(path, 'utf-8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error(`读取 JSON 文件 ${path} 时发生错误：`, error)
  }
}

// 异步写入 JSON 文件
export async function writeJsonFile(path: string, data: any): Promise<void> {
  try {
    const jsonData = JSON.stringify(data)
    await fs.writeFile(path, jsonData, 'utf-8')
    console.log(`数据已成功写入到 ${path} 文件`)
  } catch (error) {
    console.error(`写入 JSON 文件 ${path} 时发生错误：`, error)
  }
}

export async function createDataFolderAndFile(
  dataFilePath: string,
  dataFolderPath: string
) {
  try {
    // 检查 data 文件夹是否存在
    const isDataFolderExists = await fs
      .stat(dataFolderPath)
      .then(stats => stats.isDirectory())
      .catch(() => false)

    // 如果 data 文件夹不存在，则创建
    if (!isDataFolderExists) {
      await fs.mkdir(dataFolderPath)
      console.log(`已创建 data 文件夹：${dataFolderPath}`)
    }

    // 检查 data.json 文件是否存在
    const isDataFileExists = await fs
      .stat(dataFilePath)
      .then(stats => stats.isFile())
      .catch(() => false)

    // 如果 data.json 文件不存在，则创建并设置初始内容为 []
    if (!isDataFileExists) {
      await fs.writeFile(dataFilePath, '[]', 'utf-8')
      console.log(`已创建 data.json 文件：${dataFilePath}`)
    }
  } catch (error) {
    console.error('创建 data 文件夹和 data.json 文件时发生错误：', error)
  }
}
