// Author: TrungQuanDev: https://youtube.com/@trungquandev

import jwt from 'jsonwebtoken'

const generateToken = (payload, privateKey, expiredTime) => {
  return jwt.sign(payload, privateKey, {
    expiresIn: expiredTime || '1h'
  })
}

const verifyToken = (token, privateKey) => {
  return jwt.verify(token, privateKey)
}

const JwtProvider = {
  generateToken,
  verifyToken
}

export default JwtProvider
