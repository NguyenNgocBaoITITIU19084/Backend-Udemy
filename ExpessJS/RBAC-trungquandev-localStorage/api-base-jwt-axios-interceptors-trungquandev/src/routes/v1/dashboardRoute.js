// Author: TrungQuanDev: https://youtube.com/@trungquandev
import express from 'express'
import { dashboardController } from '~/controllers/dashboardController'

import isAuthenticated from '~/middlewares/authMiddleware'

import { rbacMiddleware_Level_1 } from '../../middlewares/rabcMiddleware_Level_1'
import { MOCK_ROLES } from '~/model/MockDatabase'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/access')
  .get(isAuthenticated, dashboardController.access)

Router.route('/messages')
  .get(
    isAuthenticated,
    rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES.ADMIN, MOCK_ROLES.MODERATOR]),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'get API: /message successfully' })
    })

Router.route('/admin-tools')
  .get(
    isAuthenticated,
    rbacMiddleware_Level_1.isValidPermission([MOCK_ROLES.ADMIN]),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'get API: /admin-tools successfully' })
    })

export const dashboardRoute = Router
