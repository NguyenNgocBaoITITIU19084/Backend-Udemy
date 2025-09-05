// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import RBACRoute from './component/core/RBACRoute'
import { permissions } from './config/rbacConfig'

function ProtectedRoutes() {
  const userInfor = JSON.parse(localStorage.getItem('userInfor'))
  if (!userInfor) return <Navigate to='/login' relative={true}/>
  return <Outlet/>
}

function PublicRotes() {
  const userInfor = JSON.parse(localStorage.getItem('userInfor'))
  if (userInfor) return <Navigate to='/dashboard' relative={true}/>
  return <Outlet/>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<PublicRotes/>}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<RBACRoute requiredPermission={permissions.VIEW_DASHBOARD}><Dashboard /></RBACRoute>} />
        {/* lưu ý tất cả các tabs dưới đây đều nằm chung trong một component Dashboard để test cho nó gọn, trong thực tế phải chia component và chia pages */}
        <Route path='/admin' element={<RBACRoute requiredPermission={permissions.VIEW_ADMIN}><Dashboard /></RBACRoute>} />
        <Route path='/revenue' element={<RBACRoute requiredPermission={permissions.VIEW_REVENUE}><Dashboard /></RBACRoute>} />
        <Route path='/messages' element={<RBACRoute requiredPermission={permissions.VIEW_MESSAGES}><Dashboard /></RBACRoute>} />
        <Route path='/support' element={<RBACRoute requiredPermission={permissions.VIEW_SUPPORT}><Dashboard /></RBACRoute>} />
      </Route>

      <Route path='/access-dined' element={<div>Access-Dined</div>} />
      <Route path='*' element={<div>404 not found</div>} />
    </Routes>
  )
}

export default App
