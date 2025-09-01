import { StatusCodes } from 'http-status-codes'
import JwtProvider from '~/providers/JwtProvider'

// Author: TrungQuanDev: https://youtube.com/@trungquandev
const isAuthenticated = (req, res, next) => {
  const access_token = req.headers.authorization?.split(' ')[1]

  if (!access_token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' })

  try {
    const userInfor = JwtProvider.verifyToken(access_token, process.env.JWT_PRIVATE_KEY)
    req.jwtDecoded = userInfor
    next()
  } catch (error) {

    if (error.message?.includes('jwt expired')) {
      return res.status(StatusCodes.GONE).json({ message: 'Token expired' })
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' })
  }
}

export default isAuthenticated