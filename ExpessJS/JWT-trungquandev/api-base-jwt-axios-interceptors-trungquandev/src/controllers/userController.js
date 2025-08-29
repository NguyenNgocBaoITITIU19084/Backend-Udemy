// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'

import JwtProvider from '../providers/JwtProvider.js'

/**
 * Mock nhanh thông tin user thay vì phải tạo Database rồi query.
 * Nếu muốn học kỹ và chuẩn chỉnh đầy đủ hơn thì xem Playlist này nhé:
 * https://www.youtube.com/playlist?list=PLP6tw4Zpj-RIMgUPYxhLBVCpaBs94D73V
 */
const MOCK_DATABASE = {
  USER: {
    ID: 'trungquandev-sample-id-12345678',
    EMAIL: 'trungquandev.official@gmail.com',
    PASSWORD: 'trungquandev@123'
  }
}

/**
 * 2 cái chữ ký bí mật quan trọng trong dự án. Dành cho JWT - Jsonwebtokens
 * Lưu ý phải lưu vào biến môi trường ENV trong thực tế cho bảo mật.
 * Ở đây mình làm Demo thôi nên mới đặt biến const và giá trị random ngẫu nhiên trong code nhé.
 * Xem thêm về biến môi trường: https://youtu.be/Vgr3MWb7aOw
 */
const ACCESS_TOKEN_SECRET_SIGNATURE = 'KBgJwUETt4HeVD05WaXXI9V3JnwCVP'
const REFRESH_TOKEN_SECRET_SIGNATURE = 'fcCjhnpeopVn2Hg1jG75MUi62051yL'

const login = async (req, res) => {
  try {
    if (req.body.email !== MOCK_DATABASE.USER.EMAIL || req.body.password !== MOCK_DATABASE.USER.PASSWORD) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Your email or password is incorrect!' })
      return
    }

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    const payload = {
      id: MOCK_DATABASE.USER.ID,
      email: req.body.email
    }

    const access_token = JwtProvider.generateToken(payload, process.env.JWT_PRIVATE_KEY, process.env.JWT_EXPIRES_IN)
    const refresh_token = JwtProvider.generateToken(payload, process.env.REFRESH_JWT_EXPIRES_KEY, process.env.REFRESH_JWT_EXPIRES_IN)

    res.cookie('access_token', access_token, {
      httpOnly: true, // chỉ có thể truy cập bằng http, không truy cập bằng js được
      secure: true, // true trên môi trường production (https), false trên môi trường dev (http)
      maxAge: ms('14 days') // 15 phút - thời gian tồn tại của cookie
    })

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true, // chỉ có thể truy cập bằng http, không truy cập bằng js được
      secure: true, // true trên môi trường production (https), false trên môi trường dev (http)
      maxAge: ms('14 days') // 7 ngày - thời gian tồn tại của cookie
    })

    return res.status(StatusCodes.OK).json({ message: 'Login API success!', user: payload, access_token, refresh_token})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: ' Refresh Token API success.' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
