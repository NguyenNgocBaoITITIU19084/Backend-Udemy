// Author: TrungQuanDev: https://youtube.com/@trungquandev
// https://axios-http.com/docs/interceptors

import axios from 'axios'
import { toast } from 'react-toastify'

const TIME_OUT = 10 * 60 * 1000 // 10 minutes

const authorizedAxios = axios.create()

authorizedAxios.defaults.timeout = TIME_OUT // 10 minutes

// tự động gửi kèm nhận cookie khi request được gửi đi hoặc được trả về từ server
authorizedAxios.defaults.withCredentials = true
// Add a request interceptor
authorizedAxios.interceptors.request.use(function (config) {
  // Do something before request is sent

  const access_token = localStorage.getItem('accessToken')
  console.log('access_token', access_token)
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
},
{ synchronous: true }
)

// Add a response interceptor
authorizedAxios.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function onRejected(error) {
  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default authorizedAxios