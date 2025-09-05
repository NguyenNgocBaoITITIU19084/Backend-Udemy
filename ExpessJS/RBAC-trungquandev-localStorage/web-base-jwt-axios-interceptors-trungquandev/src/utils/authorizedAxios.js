// Author: TrungQuanDev: https://youtube.com/@trungquandev
import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogoutAPI, handleRefreshAPI } from '~/apis/handleAPI'

const TIME_OUT = 10 * 60 * 1000 // 10 minutes

let AuthorizationAxiosInstance = axios.create()

AuthorizationAxiosInstance.defaults.timeout = TIME_OUT

// Add a request interceptor
AuthorizationAxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent

  const access_token = localStorage.getItem('access_token')
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
AuthorizationAxiosInstance.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function onRejected(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('error:::', error)

  // handle error 401 (UNAUTHORIZATION)
  if (error.response?.status === 401) {
    handleLogoutAPI()

    location.href = '/login'
  }

  // handle error 410 GONE
  const originRequests = error.config
  if (error.response?.status === 410 && originRequests) {


    if (!refreshPromise) {
      const refresh_token = localStorage.getItem('refresh_token')
      refreshPromise = handleRefreshAPI(refresh_token)
        .then((res) => {
          const { access_token } = res.data
          localStorage.setItem('access_token', access_token)

          AuthorizationAxiosInstance.defaults.headers.Authorization = `Bearer ${access_token}`
        })
        .catch((refresh_token_error) => {
          console.log("refresh_token_error", refresh_token_error)
          
          handleLogoutAPI()
            .then(() => {
              location.href = '/login'
            })

          return Promise.reject(refresh_token_error)
        })
        .finally(() => {
          refreshPromise = null
        })
    }

    return refreshPromise.then(() => {
    // bước cuối cùng này cực kì quan trọng: return lại axios instance của chúng ta kết hợp với cái
      // originResquest để gội lại nhưng api ban đầu nó bị lỗi
      return AuthorizationAxiosInstance(originRequests)
    })

  }


  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }

  return Promise.reject(error)
})

export default AuthorizationAxiosInstance