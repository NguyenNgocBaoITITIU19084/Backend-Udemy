// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

function ProtectedRoutes() {
  const user = JSON.parse(localStorage.getItem('userInfor'))
  if (!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}

function PublicRoutes() {
  const user = JSON.parse(localStorage.getItem('userInfor'))
  if (user) return <Navigate to="/dashboard" replace={true} />
  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<PublicRoutes/>}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
