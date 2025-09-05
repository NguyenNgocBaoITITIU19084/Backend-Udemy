// Author: TrungQuanDev: https://youtube.com/@trungquandev
import express from 'express'
import { dashboardController } from '~/controllers/dashboardController'

import isAuthenticated from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/access')
  .get(isAuthenticated, dashboardController.access)

export const dashboardRoute = Router
