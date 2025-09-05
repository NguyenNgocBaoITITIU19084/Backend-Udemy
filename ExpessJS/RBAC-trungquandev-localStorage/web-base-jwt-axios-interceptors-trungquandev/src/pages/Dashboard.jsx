// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import AuthorizationAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT, TABS } from '~/utils/constants'
import Button from '@mui/material/Button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis/handleAPI'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import usePermission from '~/hooks/usePermission'
import { permissions } from '~/config/rbacConfig'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { hasPermission } = usePermission(user?.role)

  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthorizationAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
      setUser(res.data)
    }
    fetchData()
  }, [])

  function handleLogout() {
    handleLogoutAPI()

    navigate('/login')
  }

  // lấy pathname url hiện tại và gắn lại cho trình duyệt khi người re-fresh trang hoặc nhấn F5
  const getCurrentActiveTab = () => {
    let currentTab = TABS.DASHBOARD
    Object.values(TABS).forEach((tab) => {
      if (location.pathname.includes(tab)) currentTab = tab
    })
    return currentTab
  }

  const [value, setValue] = useState(getCurrentActiveTab())

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
      maxWidth: '1120px',
      marginTop: '1em',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 1em'
    }}>
      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>
      <Alert severity="success" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Role of the current user: &nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
        &nbsp;
      </Alert>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="RBAC permission ui">
              {hasPermission(permissions.VIEW_DASHBOARD) &&
                <Tab label="dashboard" value={TABS.DASHBOARD} component={Link} to='/dashboard' />
              }
              {hasPermission(permissions.VIEW_SUPPORT) &&
                <Tab label="support" value={TABS.SUPPORT} component={Link} to='/support'/>
              }
              {hasPermission(permissions.VIEW_MESSAGES) &&
                <Tab label="messages" value={TABS.MESSAGES} component={Link} to='/messages'/>
              }
              {hasPermission(permissions.VIEW_REVENUE) &&
                <Tab label="revenue" value={TABS.REVENUE} component={Link} to='/revenue'/>
              }
              {hasPermission(permissions.VIEW_ADMIN) &&
                <Tab label="admin" value={TABS.ADMIN} component={Link} to='/admin'/>
              }
            </TabList>
          </Box>
          {hasPermission(permissions.VIEW_DASHBOARD) &&
          <TabPanel value={TABS.DASHBOARD}>
            <Alert severity="success" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              This page can be access by all roles!: &nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
              &nbsp;
            </Alert>
          </TabPanel>
          }
          {hasPermission(permissions.VIEW_SUPPORT) &&
          <TabPanel value={TABS.SUPPORT}>
            <Alert severity="success" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              This page can be access by all roles!: &nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
              &nbsp;
            </Alert>
          </TabPanel>
          }
          {hasPermission(permissions.VIEW_MESSAGES) &&
          <TabPanel value={TABS.MESSAGES}>
            <Alert severity="info" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              This page can be access by all roles!: &nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
              &nbsp;
            </Alert>
          </TabPanel>
          }
          {hasPermission(permissions.VIEW_REVENUE) &&
          <TabPanel value={TABS.REVENUE}>
            <Alert severity="warning" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              This page can be access by all roles!: &nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
              &nbsp;
            </Alert>
          </TabPanel>
          }
          {hasPermission(permissions.VIEW_ADMIN) &&
          <TabPanel value={TABS.ADMIN}>
            <Alert severity="error" variant='outlined' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              This page can be access by all roles!: &nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
              &nbsp;
            </Alert>
          </TabPanel>
          }
        </TabContext>
      </Box>

      <Button onClick={handleLogout}>Log out</Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default Dashboard
