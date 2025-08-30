import authorizedAxios from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const handleLogoutAPI = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfor')

  return await authorizedAxios.delete(`${API_ROOT}/v1/users/logout`)
}

export const handleRefreshAPI = async (refreshToken) => {
  return await authorizedAxios.put(`${API_ROOT}/v1/users/refresh_token`, { refresh_token: refreshToken })
}