// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from 'http-status-codes'

const access = async (req, res) => {
  try {
    const { id, email, role } = req.jwtDecoded
    const user = { id, email, role }

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const dashboardController = {
  access
}
