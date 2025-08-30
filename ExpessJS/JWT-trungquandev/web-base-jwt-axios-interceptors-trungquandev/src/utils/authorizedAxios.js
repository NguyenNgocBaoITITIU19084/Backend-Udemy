// Author: TrungQuanDev: https://youtube.com/@trungquandev
// https://axios-http.com/docs/interceptors

import axios from 'axios'
import { toast } from 'react-toastify'
import { handleRefreshAPI, handleLogoutAPI } from '~/apis'

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

let refreshPromise = null

// Add a response interceptor
authorizedAxios.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function onRejected(error) {
  // khu vực xử lý lỗi quan trọng
  // Nếu nhận lỗi 401(Unauthorization) => logout luôn
  if (error.response?.status === 401) {
    handleLogoutAPI().then(() => {
      // nếu dùng cookie nhớ xóa userInfor trong localstorage
      localStorage.removeItem('userInfor')

      location.href = '/login'
    }).catch()
  }
  // Nếu nhận lỗi 410(GONE) => gọi api refresh token để lấy lại access token
  // lấy tất cả các request bị lỗi thông qua error.config
  const originRequest = error.config
  console.log('originRequest from authorizedAxios:::', originRequest)
  if (error.response?.status === 410 && originRequest) {

    if (!refreshPromise) {

      // lấy re-fresh token từ local storage
      const refresh_token = localStorage.getItem('refreshToken')

      // gọi api lấy access token mới
      refreshPromise = handleRefreshAPI(refresh_token)
        .then((res) => {

          // đây là các trường hợp của local storage
          const { access_token } = res.data
          localStorage.setItem('accessToken', access_token)

          // đính kèm lại vào các request 
          authorizedAxios.defaults.headers.Authorization = `Bearer ${access_token}`

          // còn trường hợp cookies, thì accesstoken được update lại trong website thông qua apis rồi
          //...
        })
        .catch((_err) => {
          // nếu nhận bất kỳ lõi nào từ api re-fresh token từ chúng logout luôn
          handleLogoutAPI().then(() => {
          // nếu dùng cookie nhớ xóa userInfor trong localstorage
            localStorage.removeItem('userInfor')

            location.href = '/login'
          })

          return Promise.reject(_err)
        })
        .finally(() => {
          refreshPromise = null
        })
    }

    refreshPromise.then(() => {
    // bước cuối cùng này cực kì quan trọng: return lại axios instance của chúng ta kết hợp với cái
      // originResquest để gội lại nhưng api ban đầu nó bị lỗi
      return authorizedAxios(originRequest)
    })

  }

  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default authorizedAxios