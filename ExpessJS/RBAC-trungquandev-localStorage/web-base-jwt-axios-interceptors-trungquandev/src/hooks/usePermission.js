import { rolePermissions } from '~/config/rbacConfig'

const usePermission = (userRole) => {
  const allowedPermision = rolePermissions[userRole] || []

  const hasPermission = (permission) => {
    return allowedPermision.includes(permission)
  }
  return { hasPermission }
}

export default usePermission