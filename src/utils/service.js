import axios from 'axios'

import { devUrl, proUrl, timeout } from './config'
import { isDev } from './tools'
const BASE_URL = isDev ? devUrl : proUrl

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = timeout
axios.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  const { status, data } = response
  if (status === 200) {
    return data
  }
  throw Error(response.statusText || '请求错误')
})

export const getData = (url, params) => {
  return axios.get(url, { params })
}

export const postData = (url, { data = {}, params = {}, ...info }) => {
  return axios.post(url, data, { params, ...info })
}
