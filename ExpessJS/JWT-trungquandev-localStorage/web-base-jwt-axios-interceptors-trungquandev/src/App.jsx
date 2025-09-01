// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

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
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
