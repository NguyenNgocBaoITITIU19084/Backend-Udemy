import AuthorizationAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const handleLogoutAPI = async () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('userInfor')
}

export const handleRefreshAPI = async ( refresh_token ) => {
  return await AuthorizationAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`, { refresh_token })
}
