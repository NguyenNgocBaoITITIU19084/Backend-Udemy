// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import authorizedAxios from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const userInforFromLocalStorage = JSON.parse(localStorage.getItem('userInfor'))
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)
      console.log(res.data)
      setUser(res.data)
    }
    fetchData()
  }, [])
   useEffect(() => {
    const fetchData = async () => {
      const userInforFromLocalStorage = JSON.parse(localStorage.getItem('userInfor'))
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)
      console.log(res.data)
      setUser(res.data)
    }
    fetchData()
  }, [])
   useEffect(() => {
    const fetchData = async () => {
      const userInforFromLocalStorage = JSON.parse(localStorage.getItem('userInfor'))
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)
      console.log(res.data)
      setUser(res.data)
    }
    fetchData()
  }, [])
   useEffect(() => {
    const fetchData = async () => {
      const userInforFromLocalStorage = JSON.parse(localStorage.getItem('userInfor'))
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)
      console.log(res.data)
      setUser(res.data)
    }
    fetchData()
  }, [])

  async function handleLogoutButton() {
    handleLogoutAPI()

    navigate('/login')
  }

  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      maxWidth: '1024px',
      marginTop: '1em',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      padding: '0 1em'
    }}>
      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>
      <Button onClick={handleLogoutButton} sx={{ color: 'blue', maxWidth: '150px' }}>Log out</Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default Dashboard
