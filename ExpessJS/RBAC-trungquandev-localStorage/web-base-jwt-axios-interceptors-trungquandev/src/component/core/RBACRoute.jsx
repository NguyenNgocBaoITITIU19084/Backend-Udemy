import usePermission from '~/hooks/usePermission'
import { roles } from '~/config/rbacConfig'
import { Navigate } from 'react-router-dom'

const RBACRoute = ({ requiredPermission, redirectTo = '/access-dined', children }) => {
  const user = JSON.parse(localStorage.getItem('userInfor'))
  const userRole = user?.role || roles.CLIENT

  const { hasPermission } = usePermission(userRole)

  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace={true}/>
  }

  return (
    <>{children}</>
  )
}

export default RBACRoute