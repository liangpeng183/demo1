//  封装 axios 网络请求
import axios from 'axios'
import baseUrl from '../api/baseUrl'

// 创建axios 实例
const service = axios.create({
  baseURL : baseUrl,
  timeout : 1500
})

export  default  service
