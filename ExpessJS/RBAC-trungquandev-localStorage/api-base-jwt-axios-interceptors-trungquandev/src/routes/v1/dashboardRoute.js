// Author: TrungQuanDev: https://youtube.com/@trungquandev
import express from 'express'
import { dashboardController } from '~/controllers/dashboardController'

import isAuthenticated from '~/middlewares/authMiddleware'

import { rbacMiddleware_Level_1 } from '../../middlewares/rabcMiddleware_Level_1'
import { rbacMiddleware_Level_2 } from '../../middlewares/rbacMiddleware_Level_2'
import { rbacMiddleware_Level_3 } from '../../middlewares/rbacMiddleware_Level_3'
import { MOCK_ROLES } from '~/model/MockDatabase_level_1'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/access')
  .get(isAuthenticated, 
    rbacMiddleware_Level_2.isValidPermission([]),
    dashboardController.access)

Router.route('/messages')
  .get(
    isAuthenticated,
    // rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES.ADMIN, MOCK_ROLES.MODERATOR]),
    // rbacMiddleware_Level_2.isValidPermission(['read_message']),
    rbacMiddleware_Level_3.isValidPermission(['read_message']),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'get API: /message successfully' })
    })

Router.route('/admin-tools')
  .get(
    isAuthenticated,
    // rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES.ADMIN]),
    // rbacMiddleware_Level_2.isValidPermission(['read_admin_tools']),
    rbacMiddleware_Level_3.isValidPermission(['read_admin_tools']),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'get API: /admin-tools successfully' })
    })

Router.route('/support')
  .get(
    isAuthenticated,
    // rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES.ADMIN]),
    // rbacMiddleware_Level_2.isValidPermission(['read_support']),
    rbacMiddleware_Level_3.isValidPermission(['read_support']),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'get API: /support successfully' })
    })
export const dashboardRoute = Router
