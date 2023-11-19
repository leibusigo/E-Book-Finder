import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  validateStatus: status => status < 500,
})

instance.interceptors.request.use(config => {
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // code不为0,直接抛出错误
    if (res.data.code !== 0) {
      message.error(res.data.msg)
      return Promise.reject(res)
    }

    return res.data
  },
  error => {
    message.error(error.message || error)
    return Promise.reject(error)
  }
)

export default instance
