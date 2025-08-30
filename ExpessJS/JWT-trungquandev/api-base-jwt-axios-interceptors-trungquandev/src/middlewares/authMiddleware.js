// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from 'http-status-codes'
import JwtProvider from '~/providers/JwtProvider'
const authMiddleware = (req, res, next) => {

  // Cách 1: Lấy token từ header Authorization
  const access_token_FromLocal = req.headers.authorization?.split(' ')[1] // Bearer tokenString
  console.log('access_token_FromLocal: ', access_token_FromLocal)

  if (!access_token_FromLocal) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' })
  }

  // Cách 2: Lấy token từ cookie
  const access_token_FromCookie = req.cookies?.access_token
  console.log('access_token_FromCookie: ', access_token_FromCookie)

  if (!access_token_FromCookie) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' })
  }

  // Bước 3: giải mã token, kiểm tra tính hợp lệ của token
  // Nếu token hợp lệ => lưu vào req.jwtDecoded=> next()
  // Nếu token không hợp lệ => res.status(403).json({ message: 'Invalid token' })
  try {
    const decoded = JwtProvider.verifyToken(access_token_FromLocal, process.env.JWT_PRIVATE_KEY)
    req.jwtDecoded = decoded
    console.log('Decoded from authMiddleware: ', decoded)
    next()
  } catch (error) {
    // Token expired

    if (error.message?.includes('jwt expired')) {
      return res.status(StatusCodes.GONE).json({ message: 'Token expired' })
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' })
  }
}


export default authMiddleware